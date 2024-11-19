// import { Exchange } from "../Exchange"
// import { Params } from "../Params"
import { cn } from '@/lib/utils';
import { Params } from '../Params';
import { User } from '../User';
import styles from './Header.module.scss';

export const Header = () => {
	return (
		<header className={cn('bg-background/40 backdrop-blur-[4px] shadow-2xl', styles.header)}>
			<User />
			<div className={styles.right}>
				{/* <Exchange />*/}
				<Params />
			</div>
		</header>
	);
};
