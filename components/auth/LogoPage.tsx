import Image from "next/image";
import styles from "./LogoPage.module.scss";

export const LogoPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.brandGroup} aria-label="Lendsqr">
        <Image
          src="union.svg"
          alt="Lendsqr logo"
          width={24.75}
          height={25.003942489624023}
          className={styles.logo}
          priority
        />

        <Image
          src="/lendsqr.svg"
          alt="Lendsqr"
          width={138.43972778320312}
          height={36}
          className={styles.wordmark}
          priority
        />
      </div>

      <div className={styles.illustrationWrap} aria-hidden="true">
        <Image
          src="/pablo-sign-in 1.svg"
          alt=""
          width={600}
          height={338}
          className={styles.illustration}
          priority
        />
      </div>
    </section>
  );
};
