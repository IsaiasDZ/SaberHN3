import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { useStore } from "@/lib/store";
import { BookOpen, GraduationCap, UserCircle2, Sparkles, ShoppingCart, LogOut, Home, Crown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CartDrawer } from "@/components/CartDrawer";

export type TabKey = "explore" | "learning" | "teach" | "plans" | "profile";

interface Props {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  isInstructor: boolean;
}

export function MobileTabBar({ active, onChange, isInstructor }: Props) {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const tabs: { key: TabKey; label: string; icon: typeof BookOpen; show: boolean }[] = [
    { key: "explore", label: "Explorar", icon: BookOpen, show: true },
    { key: "learning", label: "Mis cursos", icon: GraduationCap, show: true },
    { key: "teach", label: "Enseñar", icon: Sparkles, show: isInstructor },
    { key: "plans", label: "Planes", icon: Crown, show: isInstructor },
    { key: "profile", label: "Perfil", icon: UserCircle2, show: true },
  ];

  const visibleTabs = tabs.filter(t => t.show);

  return (
    <>
      {/* Bottom navigation bar — fixed, native app style */}
      <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t bg-card/95 backdrop-blur-lg pb-safe">
        <div className="flex items-stretch justify-around px-1 py-1.5">
          {visibleTabs.map(tab => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 transition active:scale-95"
              >
                <div className={`relative grid h-7 w-7 place-items-center rounded-full transition ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                  <tab.icon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                </div>
                <span className={`text-[10px] font-medium leading-none ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 transition active:scale-95"
          >
            <div className="relative grid h-7 w-7 place-items-center rounded-full text-muted-foreground">
              <ShoppingCart style={{ width: 18, height: 18 }} />
              {count > 0 && (
                <span
                  className="absolute -right-1 -top-1 grid place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground"
                  style={{ height: 15, minWidth: 15, padding: "0 3px" }}
                >
                  {count}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium leading-none text-muted-foreground">Carrito</span>
          </button>
          {/* Logout button */}
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 transition active:scale-95"
          >
            <div className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground">
              <LogOut style={{ width: 18, height: 18 }} />
            </div>
            <span className="text-[10px] font-medium leading-none text-muted-foreground">Salir</span>
          </button>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="mx-4 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              Volverás a la pantalla de inicio de sesión.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { logout(); setConfirmOpen(false); window.location.href = "/login"; }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sí, salir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/* Top app bar for mobile — compact, orange accent */
export function MobileTopBar({ title, subtitle, onHome }: { title: string; subtitle?: string; onHome?: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-primary px-5 pb-3 pt-12 text-white pt-safe"
      style={{ background: "linear-gradient(160deg, #f97316 0%, #ea580c 100%)" }}>
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold">{title}</h1>
          {subtitle && <p className="truncate text-xs text-white/80">{subtitle}</p>}
        </div>
        {onHome && (
          <button onClick={onHome} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20">
            <Home className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
          </button>
        )}
      </div>
    </header>
  );
}
