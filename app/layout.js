import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Coffee & Books — café & livraria',
  description: 'Site de demonstração da cafeteria temática Coffee & Books.',
  openGraph: { title: 'Coffee & Books — café & livraria', description: 'Seu lugar entre uma página e outra.', locale: 'pt_BR', type: 'website' },
};

export const viewport = { themeColor: '#4B2E1A' };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
