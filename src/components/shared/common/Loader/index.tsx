import React from 'react';
import styles from './loader.module.scss';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = () => {
  return (
    // <div className="flex w-full h-screen items-center justify-center ">
    //   <div className="flex flex-col items-center">
    //     <div className="size-8 animate-spin rounded-full border-y-2 border-blue-500" />
    //     <p className="mt-4 text-blue-500">{text}</p>
    //   </div>
    // </div>
		<div className={styles.loading}>
		<img src="/images/spin.png" alt="Loading" className={styles.spinner} />
	</div>
  );
};

export default Loader;
