import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Yinghai Yu | Data Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const avatarBuffer = readFileSync(join(process.cwd(), 'public/avatars/handsome-guy.jpeg'))
  const avatarSrc = `data:image/jpeg;base64,${avatarBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a192f',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '72px 96px',
          fontFamily: '"Courier New", Courier, monospace',
          position: 'relative',
          gap: 72,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            display: 'flex',
            flexShrink: 0,
            width: 200,
            height: 200,
            borderRadius: 8,
            overflow: 'hidden',
            border: '2px solid rgba(100,255,218,0.25)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt="Yinghai Yu"
            width={200}
            height={200}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>

        {/* Right: text content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              fontWeight: 700,
              color: '#64ffda',
              marginBottom: 32,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ opacity: 0.55 }}>&lt;</span>
            YY
            <span style={{ opacity: 0.55 }}>/&gt;</span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#e6f1ff',
              lineHeight: 1.05,
              marginBottom: 16,
              letterSpacing: '-0.03em',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Yinghai Yu
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#8892b0',
              marginBottom: 40,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Data Engineer
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 10 }}>
            {['PySpark', 'Databricks', 'Kafka', 'dbt', 'AWS'].map((tag) => (
              <div
                key={tag}
                style={{
                  border: '1px solid rgba(100,255,218,0.3)',
                  borderRadius: 6,
                  padding: '5px 14px',
                  fontSize: 16,
                  color: '#64ffda',
                  fontFamily: '"Courier New", Courier, monospace',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* URL bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            right: 96,
            fontSize: 16,
            color: 'rgba(136,146,176,0.5)',
            fontFamily: '"Courier New", Courier, monospace',
          }}
        >
          yinghai-yu.vercel.app
        </div>
      </div>
    ),
    size,
  )
}
