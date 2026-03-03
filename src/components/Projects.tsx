'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { Node, Edge } from '@xyflow/react'
import ProjectDrawer, { type ProjectWithArch } from './ProjectDrawer'

// ─── Graph data: Financial Anomaly Detection System (GrubMarket) ──────────────
// Dual-path architecture: Batch/Audit (left) + Near-RT ML Detection (right)
// Source: Oracle NetSuite ERP (outside Airflow group)
// Airflow orchestrates 3 DAGs covering both paths end-to-end

// Shared animated edge style — all edges use this for visual consistency
const E: Pick<Edge, 'animated' | 'style'> = {
  animated: true,
  style: { stroke: '#64ffda', strokeOpacity: 0.3, strokeWidth: 1.5 },
}

const financialAnomalyNodes: Node[] = [
  // ── Shared data source ────────────────────────────────────────────────────
  {
    id: 'erp',
    type: 'dataSource',
    position: { x: 230, y: 0 },
    data: {
      label: 'Oracle NetSuite ERP — 90+ Subsidiaries',
      sub: 'Orders · Invoices · Inventory · Item Catalog across all subsidiary companies',
      tag: 'Data Source',
      icon: '/logos/Netsuite.png',
    },
  },
  // ── Airflow group (must appear BEFORE its children) ───────────────────────
  {
    id: 'airflow',
    type: 'orchestrator',
    position: { x: 0, y: 110 },
    style: { width: 760, height: 820 },
    data: { label: 'Apache Airflow — Orchestration (3 DAGs)' },
  },
  // ── Left path: Batch Pipeline / Pre-IPO Audit ─────────────────────────────
  {
    id: 'jdbc',
    type: 'process',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 30, y: 50 },
    data: {
      label: 'JDBC Connection — Daily Batch Extract',
      sub: 'Incremental sync · Bulk ERP export · Daily schedule',
      tag: 'Batch Ingestion',
      icon: '/logos/JDBC.png',
    },
  },
  {
    id: 's3_batch',
    type: 'process',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 30, y: 210 },
    data: {
      label: 'AWS S3 — Batch Storage',
      sub: 'Daily snapshots · Incremental delta files · Historical archive',
      tag: 'Storage',
      icon: '/logos/S3.png',
    },
  },
  {
    id: 'snowflake',
    type: 'process',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 30, y: 370 },
    data: {
      label: 'Snowflake Data Warehouse',
      sub: 'Consolidated data · Audit-ready format · Cross-subsidiary reporting',
      tag: 'Warehouse',
      icon: '/logos/Snowflake.png',
    },
  },
  {
    id: 'dbt_snow',
    type: 'process',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 30, y: 530 },
    data: {
      label: 'dbt — Business Logic & Audit Transforms',
      sub: 'Data cleaning · Aggregations · Compliance calculations',
      tag: 'Transform',
      icon: '/logos/dbt.png',
    },
  },
  {
    id: 'tableau',
    type: 'impact',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 30, y: 690 },
    data: {
      label: 'Tableau — Pre-IPO Audit Dashboards',
      sub: 'Financial metrics · Compliance views · Executive reporting',
      tag: 'Reporting',
      icon: '/logos/Tableau.png',
    },
  },
  // ── Right path: Near-Real-Time ML Anomaly Detection ───────────────────────
  {
    id: 'suite',
    type: 'process',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 430, y: 50 },
    data: {
      label: 'SuiteScript API — Near-Real-Time Events',
      sub: '~5 min latency · Custom event scripts · Continuous streaming to S3',
      tag: 'RT Ingestion',
      icon: '/logos/SuiteScriptAPI.png',
    },
  },
  {
    id: 's3_rt',
    type: 'process',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 430, y: 210 },
    data: {
      label: 'AWS S3 — Streaming Storage',
      sub: 'Raw event data · Micro-batches · Staging area for Spark',
      tag: 'Storage',
      icon: '/logos/S3.png',
    },
  },
  {
    id: 'spark',
    type: 'process',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 430, y: 370 },
    data: {
      label: 'PySpark Structured Streaming',
      sub: '5-min micro-batch · Exactly-once via checkpointing · Trillion-row scale',
      tag: 'Stream Processing',
      icon: '/logos/PySpark.png',
    },
  },
  {
    id: 'databricks',
    type: 'process',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 430, y: 530 },
    data: {
      label: 'Databricks + Hive — Feature Store & ML',
      sub: 'dbt feature engineering · Layer 1 rule checks · Layer 2 Isolation Forest scoring',
      tag: 'ML Pipeline',
      icon: '/logos/Databricks.png',
    },
  },
  {
    id: 'reports',
    type: 'impact',
    parentId: 'airflow',
    extent: 'parent' as const,
    position: { x: 430, y: 690 },
    data: {
      label: 'Finance Team Alerts — $2M+ Exposure Identified',
      sub: 'Daily anomaly reports · Flagged records with scores · Confirmed by Finance team',
      tag: 'Output',
    },
  },
]

const financialAnomalyEdges: Edge[] = [
  { id: 'e-erp-jdbc',   source: 'erp',        target: 'jdbc',      ...E },
  { id: 'e-erp-suite',  source: 'erp',        target: 'suite',     ...E },
  { id: 'e-jdbc-s3b',   source: 'jdbc',       target: 's3_batch',  ...E },
  { id: 'e-s3b-snow',   source: 's3_batch',   target: 'snowflake', ...E },
  { id: 'e-snow-dbt',   source: 'snowflake',  target: 'dbt_snow',  ...E },
  { id: 'e-dbt-tab',    source: 'dbt_snow',   target: 'tableau',   ...E },
  { id: 'e-suite-s3rt', source: 'suite',      target: 's3_rt',     ...E },
  { id: 'e-s3rt-spark', source: 's3_rt',      target: 'spark',     ...E },
  { id: 'e-spark-db',   source: 'spark',      target: 'databricks',...E },
  { id: 'e-db-rep',     source: 'databricks', target: 'reports',   ...E },
]

// ─── Graph data: Real-time Streaming Data Pipeline (GrubMarket) ───────────────
// Focuses on the PySpark Structured Streaming path and exactly-once guarantees

const streamingNodes: Node[] = [
  {
    id: 'erp_src',
    type: 'dataSource',
    position: { x: 50, y: 0 },
    data: {
      label: 'Oracle NetSuite ERP — SuiteScript API',
      sub: 'Custom event scripts · ~5 min latency · Continuous event emission',
      tag: 'Data Source',
      icon: '/logos/Netsuite.png',
    },
  },
  {
    id: 's3_stage',
    type: 'process',
    position: { x: 50, y: 170 },
    data: {
      label: 'AWS S3 — Streaming Staging Layer',
      sub: 'Raw event micro-batches · Partitioned by subsidiary + timestamp',
      tag: 'Storage',
      icon: '/logos/S3.png',
    },
  },
  {
    id: 'spark_stream',
    type: 'process',
    position: { x: 50, y: 340 },
    data: {
      label: 'PySpark Structured Streaming — Micro-batch Processing',
      sub: '5-min trigger windows · Distributed across Databricks cluster · Schema validation',
      tag: 'Stream Processing',
      icon: '/logos/PySpark.png',
    },
  },
  {
    id: 'checkpoint',
    type: 'process',
    position: { x: 50, y: 510 },
    data: {
      label: 'Fault Tolerance — Checkpointing + Idempotent Writes',
      sub: 'WAL checkpoints to S3 · Exactly-once semantics · State recovery on failure',
      tag: 'Reliability',
      icon: '/logos/S3.png',
    },
  },
  {
    id: 'hive_out',
    type: 'impact',
    position: { x: 50, y: 680 },
    data: {
      label: 'Databricks Hive — Trillion-row Transaction Store',
      sub: 'Delta Lake format · Feature store for ML · Downstream anomaly detection pipeline',
      tag: 'Output',
      icon: '/logos/Databricks.png',
    },
  },
]

const streamingEdges: Edge[] = [
  { id: 'e-erp-s3',    source: 'erp_src',     target: 's3_stage',    ...E },
  { id: 'e-s3-spark',  source: 's3_stage',    target: 'spark_stream',...E },
  { id: 'e-spark-chk', source: 'spark_stream', target: 'checkpoint',  ...E },
  { id: 'e-chk-hive',  source: 'checkpoint',  target: 'hive_out',    ...E },
]

// ─── Graph data: COVID-19 Prediction Model MLOps (Weris) ──────────────────────
// Data collection → Azure Data Lake → TensorFlow ML → Azure DevOps CI/CD → App

const covidNodes: Node[] = [
  {
    id: 'sources',
    type: 'dataSource',
    position: { x: 50, y: 0 },
    data: {
      label: 'Public Health APIs & Web Sources',
      sub: 'WHO · CDC · Government health APIs · Scrapy web crawler · Daily ingestion',
      tag: 'Data Source',
    },
  },
  {
    id: 'lake',
    type: 'process',
    position: { x: 50, y: 170 },
    data: {
      label: 'Azure Data Lake Gen2 — Layered Storage',
      sub: 'Raw → Processed → Historical Archive · RBAC access control · Data versioning',
      tag: 'Storage',
      icon: '/logos/AzureDataLakeGen2.png',
    },
  },
  {
    id: 'ml',
    type: 'process',
    position: { x: 50, y: 340 },
    data: {
      label: 'TensorFlow Regression — Feature Eng + Daily Inference',
      sub: 'Historical cases · Mobility + population density features · Batch predictions',
      tag: 'ML Pipeline',
      icon: '/logos/TensorFlow.png',
    },
  },
  {
    id: 'cicd',
    type: 'process',
    position: { x: 50, y: 510 },
    data: {
      label: 'Azure DevOps CI/CD — Automated MLOps',
      sub: 'Daily model refresh · Blue-green deployment · Azure ML Model Registry · Rollback',
      tag: 'MLOps',
      icon: '/logos/AzureDevOps.png',
    },
  },
  {
    id: 'app',
    type: 'impact',
    position: { x: 50, y: 680 },
    data: {
      label: 'Spring MVC API + React Dashboard — Azure Cloud',
      sub: 'Real-time COVID tracking · Prediction charts · Auto-scaling · High availability',
      tag: 'Output',
      icon: '/logos/Reactjs.png',
    },
  },
]

const covidEdges: Edge[] = [
  { id: 'e-src-lake', source: 'sources', target: 'lake',  ...E },
  { id: 'e-lake-ml',  source: 'lake',    target: 'ml',    ...E },
  { id: 'e-ml-cicd',  source: 'ml',      target: 'cicd',  ...E },
  { id: 'e-cicd-app', source: 'cicd',    target: 'app',   ...E },
]

// ─── RAG Customer Service Chatbot (Bubbles & Books Phase 2) ───────────────────
const ragNodes: Node[] = [
  {
    id: 'kb',
    type: 'dataSource',
    position: { x: 50, y: 0 },
    data: {
      label: 'Knowledge Base — Products, FAQs, Policy Docs',
      sub: 'Product catalog · Order history · Support policies · 10K+ records',
      tag: 'Data Source',
    },
  },
  {
    id: 'chunking',
    type: 'process',
    position: { x: 50, y: 170 },
    data: {
      label: 'LangChain Text Chunking',
      sub: 'Chunk size 512 · 50-token overlap · Document loaders',
      tag: 'Preprocessing',
    },
  },
  {
    id: 'embedding',
    type: 'process',
    position: { x: 50, y: 340 },
    data: {
      label: 'OpenAI Embedding Generation',
      sub: 'text-embedding-3 · 1536 dimensions · Stored in Pinecone vector DB',
      tag: 'Embedding',
    },
  },
  {
    id: 'rag',
    type: 'process',
    position: { x: 50, y: 510 },
    data: {
      label: 'LangChain RAG Orchestration',
      sub: 'Query embed → Top-K=5 retrieval (similarity ≥ 0.75) → context augment → GPT-4',
      tag: 'RAG Engine',
      icon: '/logos/API.png',
    },
  },
  {
    id: 'gpt4',
    type: 'process',
    position: { x: 50, y: 680 },
    data: {
      label: 'OpenAI GPT-4 — Response Generation',
      sub: 'gpt-4-turbo · temperature 0.3 · max 500 tokens · grounded in retrieved context',
      tag: 'LLM',
    },
  },
  {
    id: 'chatbot_out',
    type: 'impact',
    position: { x: 50, y: 850 },
    data: {
      label: 'Spring Boot API + React Chat UI',
      sub: '40% reduction in customer support workload · POST /api/chat · real-time responses',
      tag: 'Output',
      icon: '/logos/Reactjs.png',
    },
  },
]

const ragEdges: Edge[] = [
  { id: 'e-kb-chunk',    source: 'kb',        target: 'chunking',   ...E },
  { id: 'e-chunk-embed', source: 'chunking',  target: 'embedding',  ...E },
  { id: 'e-embed-rag',   source: 'embedding', target: 'rag',        ...E },
  { id: 'e-rag-gpt4',    source: 'rag',       target: 'gpt4',       ...E },
  { id: 'e-gpt4-out',    source: 'gpt4',      target: 'chatbot_out', ...E },
]

// ─── LLM Product Description Generator (Bubbles & Books Phase 3) ─────────────
const llmNodes: Node[] = [
  {
    id: 'prod_data',
    type: 'dataSource',
    position: { x: 50, y: 0 },
    data: {
      label: 'Historical Product Data — 5K+ Records',
      sub: 'Product title + attributes → description pairs · Instruction-tuning format',
      tag: 'Training Data',
    },
  },
  {
    id: 'preprocess',
    type: 'process',
    position: { x: 50, y: 170 },
    data: {
      label: 'Data Preprocessing — Python Pipeline',
      sub: 'Tokenization · 80/20 train/val split · max 512 tokens · Hugging Face datasets',
      tag: 'Preprocessing',
    },
  },
  {
    id: 'fine_tune',
    type: 'process',
    position: { x: 50, y: 340 },
    data: {
      label: 'Llama 2 7B Fine-tuning via LoRA',
      sub: 'AWS SageMaker ml.g5.2xlarge (A10G 24GB) · LoRA rank 8 · 3 epochs · ~8h training',
      tag: 'Model Training',
      icon: '/logos/S3.png',
    },
  },
  {
    id: 'sagemaker',
    type: 'process',
    position: { x: 50, y: 510 },
    data: {
      label: 'AWS SageMaker Inference Endpoint',
      sub: 'ml.g5.xlarge · auto-scaling 1–3 instances · ~500ms latency per generation',
      tag: 'Deployment',
    },
  },
  {
    id: 'llm_out',
    type: 'impact',
    position: { x: 50, y: 680 },
    data: {
      label: 'Spring Boot API — /api/generate-description',
      sub: 'Product attributes → AI-generated copy at scale · eliminates manual copy-writing',
      tag: 'Output',
      icon: '/logos/SpringMVC.png',
    },
  },
]

const llmEdges: Edge[] = [
  { id: 'e-data-pre',  source: 'prod_data',  target: 'preprocess', ...E },
  { id: 'e-pre-ft',    source: 'preprocess', target: 'fine_tune',  ...E },
  { id: 'e-ft-sm',     source: 'fine_tune',  target: 'sagemaker',  ...E },
  { id: 'e-sm-out',    source: 'sagemaker',  target: 'llm_out',    ...E },
]

// ─── E-commerce ETL Migration (Bubbles & Books Phase 1) ──────────────────────
const etlNodes: Node[] = [
  {
    id: 'shopify',
    type: 'dataSource',
    position: { x: 50, y: 0 },
    data: {
      label: 'Shopify — Source E-commerce Platform',
      sub: 'Products 10K+ · Customers · Orders · Inventory · Historical data',
      tag: 'Data Source',
    },
  },
  {
    id: 'etl_pipe',
    type: 'process',
    position: { x: 50, y: 170 },
    data: {
      label: 'Python ETL Pipeline — Data Migration',
      sub: 'Extract → cleanse → transform → load · Schema mapping · Zero data loss validation',
      tag: 'ETL',
    },
  },
  {
    id: 'spring_api',
    type: 'process',
    position: { x: 50, y: 340 },
    data: {
      label: 'Spring Boot REST API',
      sub: 'JDBC → AWS RDS MySQL · Business logic · AI gateway · Kubernetes pod',
      tag: 'Application Layer',
      icon: '/logos/SpringMVC.png',
    },
  },
  {
    id: 'rds',
    type: 'process',
    position: { x: 50, y: 510 },
    data: {
      label: 'AWS RDS MySQL — Primary Storage',
      sub: 'Products · Customers · Orders · Inventory · JDBC connection',
      tag: 'Database',
    },
  },
  {
    id: 'netsuite',
    type: 'process',
    position: { x: 50, y: 680 },
    data: {
      label: 'Oracle NetSuite ERP Integration',
      sub: '30% operational efficiency improvement · Financials · Inventory · Order management',
      tag: 'ERP Sync',
      icon: '/logos/Netsuite.png',
    },
  },
  {
    id: 'react_out',
    type: 'impact',
    position: { x: 50, y: 850 },
    data: {
      label: 'React Frontend — Internal E-commerce Platform',
      sub: 'Seamless Shopify migration · Shopping cart · Checkout · Streamlit analytics dashboards',
      tag: 'Output',
      icon: '/logos/Reactjs.png',
    },
  },
]

const etlEdges: Edge[] = [
  { id: 'e-shop-etl',  source: 'shopify',   target: 'etl_pipe',  ...E },
  { id: 'e-etl-api',   source: 'etl_pipe',  target: 'spring_api', ...E },
  { id: 'e-api-rds',   source: 'spring_api', target: 'rds',       ...E },
  { id: 'e-rds-ns',    source: 'rds',       target: 'netsuite',  ...E },
  { id: 'e-ns-react',  source: 'netsuite',  target: 'react_out', ...E },
]

// ─── Project data ─────────────────────────────────────────────────────────────
const projects: ProjectWithArch[] = [
  {
    title: 'Financial Anomaly Detection System',
    description:
      'Multi-layer anomaly detection across 90+ subsidiaries at GrubMarket. Layer 1 uses rule-based validation checks; Layer 2 applies Isolation Forest on dbt-engineered features. Identified $2M+ in previously undetected financial exposure.',
    tech: ['Python', 'PySpark', 'dbt', 'Databricks ML', 'Isolation Forest', 'Airflow'],
    github: null,
    external: null,
    architecture: {
      overview:
        'Dual-path data platform across 90+ GrubMarket subsidiary ERPs. The batch path (JDBC → Snowflake → dbt → Tableau) powers pre-IPO audit reporting. The near-real-time path (SuiteScript → S3 → PySpark → Databricks) feeds the ML anomaly detection pipeline — identifying $2M+ in previously undetected financial exposure via rule-based checks and Isolation Forest scoring.',
      graph: {
        nodes: financialAnomalyNodes,
        edges: financialAnomalyEdges,
        height: 990,
      },
      metrics: [
        { label: 'Financial Exposure Identified', value: '$2M+' },
        { label: 'Subsidiaries Monitored', value: '90+' },
        { label: 'Total Business Impact', value: '$7M+' },
        { label: 'Detection Layers', value: '2' },
      ],
      note: 'Production system — implementation details generalized for confidentiality.',
    },
  },
  {
    title: 'Real-time Streaming Data Pipeline',
    description:
      'PySpark Structured Streaming pipeline processing trillion-row-scale transactional data in real time. Integrated SuiteScript API, S3, and Databricks with exactly-once semantics via checkpointing and idempotent writes for reliable, high-throughput ingestion.',
    tech: ['PySpark', 'AWS S3', 'Apache Spark', 'Databricks', 'Delta Lake', 'Airflow'],
    github: null,
    external: null,
    architecture: {
      overview:
        'PySpark Structured Streaming pipeline ingesting real-time ERP events from Oracle NetSuite via SuiteScript API. Processes data through 5-minute micro-batch windows on Databricks, with exactly-once delivery guaranteed through WAL checkpointing and idempotent writes to a Hive Delta Lake store at trillion-row scale.',
      graph: {
        nodes: streamingNodes,
        edges: streamingEdges,
        height: 780,
      },
      metrics: [
        { label: 'Processing Latency', value: '~5 min' },
        { label: 'Delivery Guarantee', value: 'Exactly-Once' },
        { label: 'Data Scale', value: 'Trillion+' },
        { label: 'Fault Tolerance', value: 'WAL + Idempotent' },
      ],
      note: 'Production system — implementation details generalized for confidentiality.',
    },
  },
  {
    title: 'RAG Customer Service Chatbot',
    description:
      'LangChain + GPT-4 retrieval-augmented generation chatbot for e-commerce customer support. Ingests product catalog and order history as a live knowledge base. Reduced customer service workload by 40%.',
    tech: ['LangChain', 'GPT-4', 'Python', 'AWS', 'Vector DB', 'FastAPI'],
    github: null,
    external: null,
    architecture: {
      overview:
        'RAG pipeline built for Bubbles & Books e-commerce. A LangChain knowledge base ingests product catalog, FAQs, and policy docs — chunked, embedded via OpenAI text-embedding-3, and stored in Pinecone. At inference time, the RAG engine retrieves Top-K=5 chunks (similarity ≥ 0.75), constructs an augmented prompt, and sends it to GPT-4-turbo for grounded response generation. Result: 40% reduction in customer support workload.',
      graph: {
        nodes: ragNodes,
        edges: ragEdges,
        height: 980,
      },
      metrics: [
        { label: 'Support Workload Reduction', value: '40%' },
        { label: 'Vector Dimensions', value: '1,536' },
        { label: 'Retrieval Top-K', value: '5' },
        { label: 'Similarity Threshold', value: '0.75' },
      ],
      note: 'Built at Bubbles & Books — production RAG implementation.',
    },
  },
  {
    title: 'LLM Product Description Generator',
    description:
      'Fine-tuned Llama 2 on domain-specific e-commerce product data and deployed as an AWS SageMaker inference endpoint. Generates product descriptions automatically at scale, eliminating manual copy-writing bottlenecks.',
    tech: ['Llama 2', 'AWS SageMaker', 'Python', 'PyTorch', 'Hugging Face'],
    github: null,
    external: null,
    architecture: {
      overview:
        'Fine-tuning and deployment pipeline for Llama 2 7B at Bubbles & Books. 5K+ historical product records were preprocessed into instruction-tuning pairs (title + attributes → description). LoRA fine-tuning ran on AWS SageMaker ml.g5.2xlarge (A10G 24GB) for ~8 hours over 3 epochs. The resulting model is served via a SageMaker inference endpoint with auto-scaling, integrated into the Spring Boot backend via POST /api/generate-description.',
      graph: {
        nodes: llmNodes,
        edges: llmEdges,
        height: 780,
      },
      metrics: [
        { label: 'Base Model', value: 'Llama 2 7B' },
        { label: 'Training Records', value: '5K+' },
        { label: 'Inference Latency', value: '~500ms' },
        { label: 'Fine-tune Method', value: 'LoRA' },
      ],
      note: 'Built at Bubbles & Books — production LLM deployment on AWS SageMaker.',
    },
  },
  {
    title: 'COVID-19 Prediction Model (MLOps)',
    description:
      'TensorFlow regression model predicting COVID-19 trends from public health APIs, with full MLOps automation through Azure DevOps CI/CD. Daily model refresh, blue-green deployment, and a React dashboard on Azure Cloud.',
    tech: ['TensorFlow', 'Azure ML', 'Azure DevOps', 'Scrapy', 'Spring Boot', 'React'],
    github: null,
    external: null,
    architecture: {
      overview:
        'End-to-end MLOps pipeline built at Weris Inc. Scrapy crawlers ingest daily data from WHO, CDC, and government health APIs into Azure Data Lake Gen2. A TensorFlow regression model is retrained and deployed automatically via Azure DevOps CI/CD, serving predictions through a Spring MVC REST API and React dashboard on Azure Cloud.',
      graph: {
        nodes: covidNodes,
        edges: covidEdges,
        height: 780,
      },
      metrics: [
        { label: 'Deployment Automation', value: 'Azure DevOps' },
        { label: 'ML Framework', value: 'TensorFlow' },
        { label: 'Cloud Cost Reduction', value: '70%+' },
        { label: 'Data Refresh Cadence', value: 'Daily' },
      ],
      note: 'Built at Weris Inc. — architecture details reflect production implementation.',
    },
  },
  {
    title: 'E-commerce ETL Migration',
    description:
      'End-to-end ETL migration from Shopify to a custom-built platform with zero data loss. Integrated Spring Boot backend with Oracle NetSuite ERP and built React operational interfaces for internal teams.',
    tech: ['Python', 'Spring Boot', 'React', 'Oracle NetSuite', 'Docker', 'ETL'],
    github: null,
    external: null,
    architecture: {
      overview:
        'Full platform migration from Shopify to an internally-built stack at Bubbles & Books. A Python ETL pipeline extracted and transformed 10K+ products, customers, orders, and inventory records with zero data loss. Data lands in AWS RDS MySQL via a Spring Boot REST API, which also synchronises with Oracle NetSuite ERP (30% operational efficiency gain). A React frontend and Streamlit analytics dashboards complete the stack, all containerised in Kubernetes.',
      graph: {
        nodes: etlNodes,
        edges: etlEdges,
        height: 980,
      },
      metrics: [
        { label: 'Data Loss on Migration', value: 'Zero' },
        { label: 'Products Migrated', value: '10K+' },
        { label: 'Ops Efficiency Gain', value: '30%' },
        { label: 'System Stability Gain', value: '25%' },
      ],
      note: 'Built at Bubbles & Books — production platform migration.',
    },
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-accent"
  >
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
)

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const ArchitectureIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
    <rect x="3" y="3" width="5" height="5" rx="1" />
    <rect x="16" y="3" width="5" height="5" rx="1" />
    <rect x="9.5" y="16" width="5" height="5" rx="1" />
    <path d="M8 5.5h8M5.5 8v3a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8M12 13v3" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectWithArch | null>(null)
  const handleClose = useCallback(() => setSelectedProject(null), [])

  return (
    <>
      <section id="projects" className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Section header */}
          <h2 className="flex items-center text-slate-white text-2xl font-semibold mb-12">
            <span className="font-mono text-accent text-xl mr-3">03.</span>
            Things I&apos;ve Built
            <span className="flex-1 h-px bg-navy-lighter ml-5" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
                onClick={() => project.architecture && setSelectedProject(project)}
                className={`group relative bg-navy-light/55 backdrop-blur-sm rounded p-6 flex flex-col h-full
                  border border-navy-lighter/40
                  hover:border-accent/25 hover:bg-navy-light/70
                  transition-all duration-200
                  ${project.architecture ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <FolderIcon />
                  <div className="flex items-center gap-3 text-slate">
                    {project.architecture && (
                      <span
                        className="flex items-center gap-1.5 text-xs font-mono text-slate/60
                          group-hover:text-accent transition-colors duration-200"
                      >
                        <ArchitectureIcon />
                        Architecture
                      </span>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-accent transition-colors"
                        aria-label="GitHub repository"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-accent transition-colors"
                        aria-label="External link"
                      >
                        <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-slate-white font-semibold text-base mb-3 group-hover:text-accent transition-colors duration-200 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate text-sm leading-relaxed flex-1 mb-6">
                  {project.description}
                </p>

                {/* Tech stack */}
                <ul className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-xs text-slate/75 border border-navy-lighter/60 bg-navy/40 rounded-full px-2.5 py-0.5"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <ProjectDrawer project={selectedProject} onClose={handleClose} />
    </>
  )
}
