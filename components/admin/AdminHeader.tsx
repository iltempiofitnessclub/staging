'use client';

import Image from 'next/image';

type Props = {
  title: string;
  logoSrc: string;
  logoAlt?: string;
  className: string;
  innerClassName: string;
  logoWrapClassName: string;
  titleClassName: string;
  rightSlot?: React.ReactNode;
};

export default function AdminHeader({
  title,
  logoSrc,
  logoAlt = '',
  className,
  innerClassName,
  logoWrapClassName,
  titleClassName,
  rightSlot
}: Props) {
  return (
    <header className={className}>
      <div className={innerClassName}>
        <div className={logoWrapClassName}>
          <Image src="/dog81.png" alt="DogHouse Boxing" width={60} height={60} priority />
          <Image src="/tempio-logo.png" alt="Il Tempio Fitness Club" width={60} height={60} priority />
        </div>

        <h1 className={titleClassName}>{title}</h1>

        {rightSlot ? <div>{rightSlot}</div> : null}
      </div>
    </header>
  );
}
