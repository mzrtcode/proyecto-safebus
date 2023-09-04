import styles from './badge.module.css';

interface BadgeProps {
    texto: string;
    color: 'verde' | 'morado';
}

function Badge(props: BadgeProps) {
    return (
        <div className={styles.badge}>
            <span className={styles[props.color]}>{props.texto}</span>
        </div>
    );
}

export default Badge;