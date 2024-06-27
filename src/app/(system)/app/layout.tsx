interface AppLayoutProps {
  children: React.ReactNode;
}
export default async function AppLayout({ children }: AppLayoutProps) {
  return <div id="sistem">{children}</div>;
}
