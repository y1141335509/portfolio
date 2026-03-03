'use client'

import {
  ReactFlow,
  Handle,
  Position,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import type { Node, Edge, NodeProps } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// ─── Shared data type ────────────────────────────────────────────────────────
type GNodeData = {
  label: string
  sub?: string
  tag?: string
  icon?: string      // path served from /public, e.g. '/logos/S3.png'
  iconSize?: number  // rendered image size inside chip (default 36)
  [key: string]: unknown
}

// ─── Shared inner layout ─────────────────────────────────────────────────────
// Icon chip (48 × 48, near-white bg) on the left.
// Tag + label + sub stacked on the right.
// Falls back to a coloured dot when no icon is provided.
function NodeContent({
  data,
  labelClass = 'text-slate-lighter font-medium',
  dotClass,
}: {
  data: GNodeData
  labelClass?: string
  dotClass: string
}) {
  const imgSize = (data.iconSize as number | undefined) ?? 36
  return (
    <div className="flex items-start gap-2.5">
      {data.icon && (
        <div
          className="flex-shrink-0 rounded-md flex items-center justify-center"
          style={{ width: 48, height: 48, background: 'rgba(240,245,255,0.92)' }}
        >
          <img
            src={data.icon}
            alt=""
            style={{ width: imgSize, height: imgSize, objectFit: 'contain', display: 'block' }}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          {!data.icon && (
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotClass}`} />
          )}
          {data.tag && (
            <span className="font-mono text-[9px] text-slate-light font-medium uppercase tracking-widest">
              {data.tag}
            </span>
          )}
        </div>
        <p className={`text-xs leading-snug ${labelClass}`}>{data.label}</p>
        {data.sub && (
          <p className="text-slate text-[10px] mt-1 leading-relaxed">{data.sub}</p>
        )}
      </div>
    </div>
  )
}

// ─── Node: Data Source (pipeline entry — 2 px top accent strip) ──────────────
function DataSourceNode({ data }: NodeProps) {
  const d = data as GNodeData
  return (
    <div
      className="relative bg-navy-light border border-navy-lighter/40 rounded overflow-hidden p-3"
      style={{ width: 300 }}
    >
      <div className="absolute top-0 inset-x-0 h-[2px] bg-accent/50" />
      <div className="mt-0.5">
        <NodeContent data={d} dotClass="bg-accent/50" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#64ffda', opacity: 0.5, width: 8, height: 8, border: 'none' }}
      />
    </div>
  )
}

// ─── Node: Process (neutral mid-pipeline) ────────────────────────────────────
function ProcessNode({ data }: NodeProps) {
  const d = data as GNodeData
  return (
    <div
      className="bg-navy-light border border-navy-lighter/40 rounded p-3"
      style={{ width: 300 }}
    >
      <NodeContent data={d} dotClass="bg-slate/40" />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#8892b0', opacity: 0.4, width: 8, height: 8, border: 'none' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#8892b0', opacity: 0.4, width: 8, height: 8, border: 'none' }}
      />
    </div>
  )
}

// ─── Node: Impact / Output (pipeline exit — 2 px bottom accent strip) ────────
function ImpactNode({ data }: NodeProps) {
  const d = data as GNodeData
  return (
    <div
      className="relative bg-navy-light border border-navy-lighter/40 rounded overflow-hidden p-3"
      style={{ width: 300 }}
    >
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-accent/70" />
      <NodeContent
        data={d}
        labelClass="text-slate-white font-semibold"
        dotClass="bg-accent/60"
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#64ffda', opacity: 0.5, width: 8, height: 8, border: 'none' }}
      />
    </div>
  )
}

// ─── Node: Orchestrator Group (dashed bounding box, no handles) ───────────────
function OrchestratorGroup({ data }: NodeProps) {
  const d = data as GNodeData
  return (
    <div className="w-full h-full border border-dashed border-accent/20 rounded-lg bg-navy/20 relative">
      <span
        className="absolute -top-3 left-3 px-2 font-mono text-[9px] text-accent/50 uppercase tracking-widest"
        style={{ background: '#112240' }}
      >
        {d.label as string}
      </span>
    </div>
  )
}

// ─── Node type registry ───────────────────────────────────────────────────────
const nodeTypes = {
  dataSource:   DataSourceNode,
  process:      ProcessNode,
  impact:       ImpactNode,
  orchestrator: OrchestratorGroup,
}

// ─── Component ────────────────────────────────────────────────────────────────
export interface PipelineGraphProps {
  nodes: Node[]
  edges: Edge[]
  height?: number
}

// useNodesState / useEdgesState are required so that Controls zoom buttons
// and node dragging work. Without them ReactFlow silently drops all interactions.
export default function PipelineGraph({
  nodes: initialNodes,
  edges: initialEdges,
  height = 520,
}: PipelineGraphProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div
      style={{ height }}
      className="rounded overflow-hidden border border-navy-lighter/30"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={false}
        zoomOnPinch={true}
        zoomOnDoubleClick={true}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        style={{ background: '#0a192f' }}
      >
        <Background
          color="#1e3a5f"
          gap={22}
          size={1}
          variant={BackgroundVariant.Dots}
        />
        <Controls showFitView showZoom showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
