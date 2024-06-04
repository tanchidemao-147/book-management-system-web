const ease = [0.6, -0.05, 0.01, 0.99];

export const authPageFadeInVariants = {
    initial: { opacity: 0, transition: { duration: .6, ease } },
    animate: { opacity: 1, transition: { duration: .6, ease } },
    exit: { opacity: 0, transition: { duration: .6, ease } }
}
export const staggerOne = {
    animate: { transition: { staggerChildren: .1 } }
}
export const authFadeInUpVariants = {
    initial: { y: 50, opacity: 0, transition: { duration: .8, ease } },
    animate: { y: 0, opacity: 1, transition: { duration: 1.5, ease } }
}

export const navbarFadeInVariants = {
	hidden: { opacity: 0, transition: { duration: .2 } },
	visible: { opacity: 1, transition: { duration: .2 } }
}