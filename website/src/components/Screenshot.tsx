import Image from 'next/image';

export interface ScreenshotProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export default function Screenshot({
  src,
  alt,
  width,
  height,
  priority,
  className,
}: ScreenshotProps) {
  return (
    <figure className={`screenshot ${className ?? ''}`.trim()}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </figure>
  );
}
