import styles from "./navbar.module.css"



const Navbar = ()=> {
    
    return(
     <div className={styles.nav_wrapper}>
        <h2 className={styles.heading}>Todo App</h2>
     </div>
    )
}


export default Navbar;