import clsx from "clsx";
import styles from "./Avatar.module.scss";
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  name?: string;
  level?: number;
}

export const Avatar = ({ src, name, level, ...props }: AvatarProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <div
        {...props}
        className={clsx(styles.avatar, props.className)}
        data-letter={name?.charAt(0)}
        title={name}
      >
        {src && <div style={{ backgroundImage: `url(${src})` }} />}
        {/* {level && <Coin level={level} min />} */}
      </div>
    </DropdownMenuTrigger>
  );
};
