import style from './styles.module.css';

import { AccountFunctionalityCardProps } from './card.types';

export default function AccountFunctionalityCard({
  context,
}: AccountFunctionalityCardProps) {
  return (
    <>
      {context.link ? (
        <a
          href={context.link}
          className={`${style.accountCardWrapper} ${
            context.inDropdown && style.cardDropdown
          }`}
        >
          <img
            src={context.icon}
            alt={context.title}
            title={context.subtitle}
          />

          <div className={style.accountCardWrapperDetails}>
            <h3>{context.title}</h3>
            <span>{context.subtitle}</span>
          </div>
        </a>
      ) : (
        <div className={style.accountCardWrapper}>
          <img
            src={context.icon}
            alt={context.title}
            title={context.subtitle}
          />

          <div className={style.accountCardWrapperDetails}>
            <h3>{context.title}</h3>
            <span>{context.subtitle}</span>
          </div>
        </div>
      )}
    </>
  );
}
