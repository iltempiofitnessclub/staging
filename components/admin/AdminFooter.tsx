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
          <Image src={logoSrc} alt={logoAlt} width={90} height={90} />
        </div>

        <div className={colClassName}>
          <h3>Contatti</h3>
          <p>tempiofitness@gmail.com</p>
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
          <h3>Link utili</h3>
          <p>
            <Link className={linkClassName} href="#">
              Privacy Policy
            </Link>
          </p>
          <p>
            <Link className={linkClassName} href="#">
              Cookie Policy
            </Link>
          </p>
          <p>
            <Link className={linkClassName} href="#">
              Termini e Condizioni
            </Link>
          </p>
          <p>
            <Link className={linkClassName} href="#">
              Note legali
            </Link>
          </p>
        </div>

        <div className={colClassName}>
          <h3>Da capire</h3>
          <p>Uno</p>
          <p>Dueeeeeeee</p>
          <p>Tre</p>
          <p>Quattro</p>
        </div>
      </div>
    </footer>
  );
}
