import type React from "react";
import styles from "./PageFooter.module.css";

export default function PageFooter({
    setPageNumber,
    pageNumber,
    totalPageNumber,
    pageSize,
    total,
}: {
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    pageNumber: number;
    totalPageNumber: number;
    pageSize: number;
    total: number;
}) {
    let now = pageNumber * pageSize;
    if (now > total) now = total;

    return (
        <div className={styles.container}>
            <span>
                showing {now} of {total}
            </span>
            <div className={styles.buttonContainer}>
                <button
                    onClick={() => {
                        if (pageNumber !== 1) setPageNumber(pageNumber - 1);
                    }}
                >
                    <svg
                        width="3"
                        height="6"
                        viewBox="0 0 3 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2.60796 5.23294H1.7216L4.20213e-06 2.67612V2.5909H0.971595L2.60796 5.23294ZM2.60796 -1.40667e-05L0.971595 2.64203H4.20213e-06V2.5568L1.7216 -1.40667e-05H2.60796Z"
                            fill="#99A1AF"
                        />
                    </svg>
                </button>
                <span>{pageNumber}</span>
                <button
                    onClick={() => {
                        if (pageNumber !== totalPageNumber)
                            setPageNumber(pageNumber + 1);
                    }}
                >
                    <svg
                        width="3"
                        height="6"
                        viewBox="0 0 3 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.20213e-06 5.23294L1.63637 2.5909H2.60796V2.67612L0.886368 5.23294H4.20213e-06ZM4.20213e-06 -1.40667e-05H0.886368L2.60796 2.5568V2.64203H1.63637L4.20213e-06 -1.40667e-05Z"
                            fill="#99A1AF"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
