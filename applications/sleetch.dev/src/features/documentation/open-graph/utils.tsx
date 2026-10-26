import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import Logo from '@/assets/images/branding/logo.svg?react';

const satoshi = await readFile(resolve(process.cwd(), 'src/assets/fonts/satoshi/Satoshi-Regular.ttf'));
export const generate_open_graph = async (data: { title: string; description: string }) => {
  const background = '#0a0a0a';
  const foreground = '#fafafa';
  const title = data.title;
  const description = data.description;

  const svg = await satori(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 80,
        backgroundColor: background,
        color: foreground,
        fontFamily: 'Satoshi',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          alignItems: 'center',
          marginBottom: 60,
          borderRadius: 999,
          color: foreground,
          fontSize: 50,
        }}
      >
        <Logo
          style={{
            height: '70px',
            width: '70px',
            paddingRight: '15px',
          }}
        />
        Sleetch
      </div>

      <h1 style={{ fontSize: 60, margin: 0, lineHeight: 1.1 }}>{title}</h1>

      <p style={{ fontSize: 32, margin: 0, opacity: 0.85 }}>{description}</p>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Satoshi',
          data: satoshi,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
