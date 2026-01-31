"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./DashboardHeader.module.scss";
import { BrandIcon } from "./ui/BrandIcon";

export function DashboardHeader() {
  const [searchValue, setSearchValue] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        {/* Left */}
        <div className={styles.left}>
          <BrandIcon className={styles.brandGroup} />
        </div>

        {/* Middle */}
        <div className={styles.middle}>
          <form className={styles.search} onSubmit={handleSubmit} role="search">
            <input
              className={styles.searchInput}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for anything"
              aria-label="Search for anything"
            />
            <button
              className={styles.formButton}
              type="submit"
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Right */}
        <div className={styles.right}>
          <Link className={styles.docsLink} href="/docs">
            Docs
          </Link>

          <button
            className={styles.iconButton}
            type="button"
            aria-label="Notifications"
          >
            <Image
              src="/bell.svg"
              alt=""
              width={20}
              height={23}
              className={styles.bell}
              priority
            />
          </button>

          <span className={styles.avatar}>
            <Image src="/avatar.png" alt="User avatar" sizes="32px" fill />
          </span>

          <button
            className={styles.userButton}
            type="button"
            aria-label="Open user menu"
          >
            <span className={styles.userName}>Adedeji</span>
            <Image src="/dropdown.png" alt="" width={20} height={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
