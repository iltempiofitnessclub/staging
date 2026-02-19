'use client';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  logoSrc: string;
  logoAlt?: string;

  className: string;
  innerClassName: string;
  logoClassName: string;

  colClassName: string;
  linkClassName: string;
};

export default function AdminFooter({
  logoSrc,
  logoAlt = '',
  className,
  innerClassName,
  logoClassName,
  colClassName,
  linkClassName
}: Props) {
  return (
    <footer className={className}>
      <div className={innerClassName}>
        <div className={logoClassName}>
          <Image src="/dog81.png" alt="DogHouse Boxing" width={80} height={80} />
          <Image src="/tempio-logo.png" alt="Il Tempio Fitness Club" width={55} height={55} />
        </div>

        <div className={colClassName}>
          <h3>Contatti</h3>
          <p>iltempiofitnessclub@gmail.com</p>
          <p>doghouseboxing@gmail.com</p>
          <p>080.530.1234</p>
          <p>080.530.5678</p>
        </div>

        <div className={colClassName}>
          <h3>Dove siamo</h3>
          <p>Bari - Palese - 70128</p>
          <p>via V. Maiorano Capitano, 27</p>
          <p>vico VI Duca D&apos;Aosta, 7a</p>
        </div>

        <div className={colClassName}>
          <h3>Tecnologie</h3>
          <p>GitHub</p>
          <p>Netlify</p>
          <p>Supabase</p>
        </div>

        <div className={colClassName}>
          <h3>Servizio Clienti</h3>
          <p>devteamsolutionswork@gmail.com</p>
          <p>dangelodavide.work@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
