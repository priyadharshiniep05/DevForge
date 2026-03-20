import { useRouter } from 'next/router';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ThemeProvider attribute="class">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;