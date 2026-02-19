'use client';

import Image from 'next/image';
import Link from 'next/link';

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
          <Link href="/doghouse" title="Vai a DogHouse Boxing">
            <Image src="/dog81.png" alt="DogHouse Boxing" width={80} height={80} priority />
          </Link>
          <Link href="/tempio" title="Vai a Il Tempio Fitness Club">
            <Image src="/tempio-logo.png" alt="Il Tempio Fitness Club" width={55} height={55} priority />
          </Link>
        </div>

        <h1 className={titleClassName}>
          <Link href="/doghouse" title="Vai a DogHouse Boxing" style={{ textDecoration: 'none', color: 'inherit' }}>
            DOGHOUSE BOXING
          </Link>
          {' - '}
          <Link href="/tempio" title="Vai a Il Tempio Fitness Club" style={{ textDecoration: 'none', color: 'inherit' }}>
            IL TEMPIO FITNESS CLUB
          </Link>
        </h1>

        {rightSlot ? <div>{rightSlot}</div> : null}
      </div>
    </header>
  );
}
