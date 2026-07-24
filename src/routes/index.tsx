import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { COURSES, formatL, PRO_PRICE_LEMPIRAS } from "@/lib/courses";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Rocket, PlayCircle, UserPlus, Search, Handshake, CheckCircle2, GraduationCap,
  Headphones, Wrench, LineChart, Palette, Zap, Clock, Users, Tag, Star, Crown, Gift, ArrowRight,
  ShoppingCart, ShieldCheck, Quote, Building2, BookOpen, Heart, Facebook, Instagram, MessageCircle, Mail,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function iconFor(key: string) {
  const cls = "h-10 w-10";
  switch (key) {
    case "headset": return <Headphones className={cls} />;
    case "tools": return <Wrench className={cls} />;
    case "chart": return <LineChart className={cls} />;
    case "brush": return <Palette className={cls} />;
    default: return <GraduationCap className={cls} />;
  }
}

const TESTIMONIALS = [
  { name: "Karla Mendoza", role: "Estudiante · Tegucigalpa", text: "Aprendí inglés para call centers en 6 semanas. El instructor era paciente y conocía el ambiente laboral hondureño. ¡Ya conseguí trabajo!", rating: 5, initials: "KM" },
  { name: "Roberto Díaz", role: "Instructor · San Pedro Sula", text: "Publiqué mi curso de reparación de celulares y en el primer mes tuve 30 alumnos. SaberHN me dio la vitrina que necesitaba.", rating: 5, initials: "RD" },
  { name: "Andrea López", role: "Estudiante · Choluteca", text: "La nivelación de matemáticas me salvó el semestre. Pude pagar en lempiras y el horario se adaptó a mi trabajo.", rating: 5, initials: "AL" },
  { name: "Mario Pineda", role: "Instructor Pro · Tegucigalpa", text: "Con la membresía Pro mis cursos aparecen primero y tengo estadísticas detalladas. La inversión se paga sola con un alumno.", rating: 5, initials: "MP" },
];

const FAQS = [
  { q: "¿Cómo se paga en SaberHN?", a: "Pagas directamente en la plataforma con tarjeta de crédito/débito o transferencia bancaria local. Todo en lempiras hondureños." },
  { q: "¿Es seguro pagar en la plataforma?", a: "Sí. Usamos un proceso de pago seguro. La plataforma retiene el 20% de comisión y el 80% restante se acredita directamente al instructor." },
  { q: "¿Qué pasa si no me gusta la clase?", a: "Puedes calificar al instructor con estrellas y dejar una reseña visible para otros estudiantes. Nuestro equipo revisa las quejas y mediamos si es necesario." },
  { q: "¿Cómo me convierto en instructor verificado?", a: "Regístrate como instructor, completa tu perfil con tu biografía y una identificación. Nuestro equipo verifica tu información en 48 horas." },
  { q: "¿Las clases son virtuales o presenciales?", a: "Ambas. Cada instructor define la modalidad: videollamada, presencial en Tegucigalpa/San Pedro Sula, o material pregrabado." },
  { q: "¿La membresía Instructor Pro es obligatoria?", a: "No. Puedes publicar cursos gratis. La membresía Pro (L. 250/mes) da prioridad en búsquedas, videos ilimitados y estadísticas avanzadas." },
];

const ALLIANCES = [
  { name: "Universidad Nacional Autónoma de Honduras", short: "UNAH" },
  { name: "Instituto San Miguel", short: "ISM" },
  { name: "Cámara de Comercio e Industrias de Cortés", short: "CCIC" },
  { name: "Zamorano", short: "ZAMORANO" },
  { name: "Instituto Tecnológico de Honduras", short: "ITH" },
  { name: "Cámara de Comercio Tegucigalpa", short: "CCIT" },
];

function Landing() {
  const { user } = useAuth();
  const cart = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState("");
  const goTo = (to: "/register" | "/dashboard", opts?: { role?: "student" | "instructor"; pro?: boolean }) =>
    user ? navigate({ to: "/dashboard" }) : navigate({ to, search: opts });

  const addToCart = (courseId: string) => {
    const course = COURSES.find((c) => c.id === courseId);
    if (!course) return;
    cart.add(course);
    setToast(`"${course.title}" agregado al carrito`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24"
        style={{ background: "linear-gradient(165deg, #ffffff 0%, #e8edf5 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,132,110,0.10) 0%, transparent 70%)" }} />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Aprende con <span style={{ color: "var(--accent)" }}>expertos locales</span> que entienden tu realidad
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              El Saber HN conecta estudiantes con instructores verificados de Honduras. Clases virtuales o presenciales, pagos en lempiras y horarios flexibles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-8" onClick={() => goTo("/register")}>
                <Rocket className="mr-2 h-4 w-4" /> Empieza ahora
              </Button>
              <a href="#cursos">
                <Button size="lg" variant="outline" className="rounded-full border-2 px-8">
                  <Search className="mr-2 h-4 w-4" /> Buscar un curso
                </Button>
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-10">
              {[
                { n: "2,093", l: "estudiantes activos" },
                { n: "+120", l: "instructores verificados" },
                { n: "4.9★", l: "calificación promedio" },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-2xl font-bold text-primary sm:text-3xl">{s.n}</p>
                  <p className="text-sm text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-2xl border bg-card p-7 shadow-xl">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-13 w-13 place-items-center rounded-full bg-secondary text-primary" style={{ height: 52, width: 52 }}>
                    <span className="text-lg font-bold">MF</span>
                  </div>
                  <div>
                    <p className="font-semibold">María Fernández</p>
                    <p className="text-xs text-muted-foreground">Instructora de inglés · 4.9★</p>
                  </div>
                </div>
                <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: "var(--accent-warm)", color: "var(--accent)" }}>
                  En vivo · Hoy 7pm
                </span>
                <p className="mt-3 text-base font-semibold">Inglés conversacional para call centers</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 8 sesiones</span>
                  <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> 14 alumnos</span>
                  <span className="inline-flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" /> {formatL(350)}</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-2 hidden items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-md sm:flex">
                <Zap className="h-4 w-4" style={{ color: "var(--accent)" }} />
                <span className="text-sm font-medium">+20 cursos nuevos esta semana</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* BANNER DE CONFIANZA */}
      <section className="border-y bg-card py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 text-sm sm:gap-12 sm:px-6">
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" /> Instructores verificados
          </span>
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            <Star className="h-5 w-5 fill-current" style={{ color: "#f5b342" }} /> Calificaciones reales
          </span>
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" /> Pagos seguros en lempiras
          </span>
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            <Zap className="h-5 w-5" style={{ color: "var(--accent)" }} /> Horarios flexibles
          </span>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">¿Cómo funciona El Saber HN?</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Tres pasos simples para empezar a aprender o enseñar</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icon: UserPlus, t: "1. Regístrate gratis", d: "Crea tu perfil como estudiante o instructor. Sin compromiso, solo unos minutos." },
              { icon: Search, t: "2. Encuentra o publica", d: "Busca cursos por categoría, o publica tu clase y recibe alumnos." },
              { icon: Handshake, t: "3. Aprende y enseña", d: "Clases en vivo, presenciales o grabadas. Paga en lempiras con total seguridad." },
            ].map((s, i) => (
              <ScrollReveal key={s.t} delay={i * 100}>
                <div className="rounded-2xl border border-transparent bg-muted/60 p-8 text-center transition hover:-translate-y-1.5 hover:border-border hover:shadow-md">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-primary">{s.t}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INFÓGRAFICA COMISIÓN 80/20 */}
      <section className="py-16" style={{ background: "var(--brand-soft)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="rounded-2xl border bg-card p-8 shadow-sm sm:p-12">
              <h3 className="text-center text-2xl font-bold text-primary">Proceso colaborativo de venta</h3>
              <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
                El estudiante paga el 100%. SaberHN retiene el 20% de comisión y el instructor recibe el 80% restante.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border bg-muted/40 p-5 text-center">
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="mt-1 text-xs text-muted-foreground">Paga el estudiante</p>
                </div>
                <div className="rounded-xl border p-5 text-center" style={{ background: "var(--accent-warm)" }}>
                  <p className="text-3xl font-bold" style={{ color: "var(--accent)" }}>20%</p>
                  <p className="mt-1 text-xs text-muted-foreground">Comisión SaberHN</p>
                </div>
                <div className="rounded-xl border bg-muted/40 p-5 text-center">
                  <p className="text-3xl font-bold text-primary">80%</p>
                  <p className="mt-1 text-xs text-muted-foreground">Recibe el instructor</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" /> Transacción transparente y segura
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INSTRUCTORES */}
      <section id="instructores" className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <h3 className="text-3xl font-bold text-primary">Convierte tu conocimiento en ingresos</h3>
            <p className="mt-4 text-muted-foreground">
              El Saber HN te da la vitrina que necesitas. Sin inversión en infraestructura, solo tu talento y ganas de enseñar.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Perfil verificado con reseñas reales",
                "Pagos en lempiras, comisión solo del 20%",
                "Clases virtuales o presenciales, tú decides",
                "Estadísticas y herramientas para crecer",
              ].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5" style={{ color: "var(--accent)" }} /> {f}
                </li>
              ))}
            </ul>
            <Button size="lg" className="mt-8 rounded-full px-8" onClick={() => goTo("/register", { role: "instructor" })}>Registrarme como instructor</Button>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl border bg-card p-9 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <span className="inline-block rounded-full px-4 py-1 text-[11px] font-bold tracking-wider text-white"
                style={{ background: "var(--accent)" }}>
                MÁS VISIBILIDAD
              </span>
              <h4 className="mt-3 text-2xl font-bold text-primary">Instructor Pro</h4>
              <p className="mt-2 text-3xl font-bold text-primary">
                {formatL(PRO_PRICE_LEMPIRAS)} <span className="text-base font-normal text-muted-foreground">/ mes</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Destaca entre los demás y accede a herramientas premium</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Prioridad en búsquedas", "Videos pregrabados ilimitados", "Estadísticas detalladas de alumnos", 'Insignia "Pro" en tu perfil', "Soporte prioritario"].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" style={{ color: "var(--accent)" }} /> {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full rounded-full" onClick={() => goTo("/register", { role: "instructor", pro: true })}>
                <Crown className="mr-2 h-4 w-4" /> Activar Pro
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Gift className="h-3.5 w-3.5" /> Primeros 3 meses gratis
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CURSOS */}
      <section id="cursos" className="py-20" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Cursos destacados</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Lo que más están aprendiendo los estudiantes de El Saber HN</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c, i) => (
              <ScrollReveal key={c.id} delay={(i % 3) * 100}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
                  <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} aria-hidden>
                    <div className="grid h-full w-full place-items-center bg-black/20 text-white">
                      {iconFor(c.icon ?? "")}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {c.tag && (
                      <span className="inline-block w-fit rounded-full px-3 py-0.5 text-[11px] font-semibold"
                        style={{ background: "var(--accent-warm)", color: "var(--accent)" }}>
                        {c.tag}
                      </span>
                    )}
                    <h4 className="mt-2 text-lg font-semibold text-primary">{c.title}</h4>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>Por {c.instructor}</span>
                      {c.rating && (
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-current" style={{ color: "#f5b342" }} /> {c.rating}
                        </span>
                      )}
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <span className="font-bold text-primary">{formatL(c.price)}</span>
                      {cart.has(c.id) ? (
                        <span className="text-xs font-medium text-primary">En el carrito ✓</span>
                      ) : (
                        <Button size="sm" onClick={() => addToCart(c.id)}>
                          <ShoppingCart className="mr-1.5 h-3.5 w-3.5" /> Agregar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section id="sobre-nosotros" className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary">
                <Heart className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-3xl font-bold text-primary sm:text-4xl">Sobre SaberHN</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                SaberHN nació como una iniciativa Lean Startup hondureña con una misión clara: democratizar el acceso a
                educación de calidad y accesible en Honduras. Vimos que miles de hondureños aprendían oficios e idiomas
                por WhatsApp o boca a boca, sin garantía de calidad ni seguridad en el pago.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Conectamos a instructores verificados con estudiantes que quieren superarse, con pagos seguros en lempiras
                y una plataforma que garantiza transparencia para ambos lados. Nuestra ventaja competitiva es la
                verificación, la calidad y la seguridad en cada transacción.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonios" className="py-20" style={{ background: "var(--brand-soft)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Lo que dicen nuestros usuarios</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Historias reales de estudiantes e instructores</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={(i % 4) * 80}>
                <div className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <Quote className="h-8 w-8" style={{ color: "var(--accent)", opacity: 0.4 }} />
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{t.text}</p>
                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" style={{ color: "#f5b342" }} />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3 border-t pt-4">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ALIANZAS */}
      <section id="alianzas" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Alianzas estratégicas</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Trabajamos junto a universidades, institutos y cámaras de comercio de Honduras
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ALLIANCES.map((a, i) => (
              <ScrollReveal key={a.short} delay={(i % 6) * 60}>
                <div className="flex h-24 flex-col items-center justify-center rounded-xl border bg-card text-center shadow-sm transition hover:shadow-md">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-xs font-bold text-foreground">{a.short}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20" style={{ background: "var(--muted)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Preguntas frecuentes</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Resolvemos las dudas más comunes</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <Accordion type="single" collapsible className="rounded-2xl border bg-card px-4">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">¿Tienes preguntas?</h2>
            <p className="mt-3 text-muted-foreground">
              Escríbenos y te responderemos lo antes posible. También estamos en redes sociales.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href="https://wa.me/50499999999" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-5 w-5 text-green-600" /> WhatsApp de soporte: +504 9999-9999
              </a>
              <a href="mailto:hola@saberhn.hn" className="block items-center gap-2 text-muted-foreground hover:text-foreground">
                <Mail className="mr-2 inline h-5 w-5 text-primary" /> hola@saberhn.hn
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-muted transition hover:bg-accent">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-muted transition hover:bg-accent">
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a href="#" aria-label="TikTok" className="grid h-10 w-10 place-items-center rounded-full bg-muted transition hover:bg-accent">
                <BookOpen className="h-5 w-5 text-primary" />
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <form className="rounded-2xl border bg-card p-6 shadow-sm" onSubmit={(e) => { e.preventDefault(); alert("¡Gracias! Te contactaremos pronto."); }}>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Nombre</label>
                  <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" placeholder="Tu nombre" maxLength={60} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Correo</label>
                  <input type="email" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" placeholder="tucorreo@ejemplo.com" maxLength={80} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Mensaje</label>
                  <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" placeholder="¿En qué podemos ayudarte?" maxLength={500} />
                </div>
                <Button type="submit" className="w-full">Enviar mensaje</Button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center text-white" style={{ background: "var(--primary)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold sm:text-4xl">¿Listo para empezar?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Únete a El Saber HN hoy y forma parte de la comunidad educativa que está transformando Honduras.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full bg-white px-8 text-primary hover:bg-white/90" onClick={() => goTo("/register")}>
                <UserPlus className="mr-2 h-4 w-4" /> Soy estudiante
              </Button>
              <Button size="lg" className="rounded-full px-8 text-white hover:opacity-90"
                style={{ background: "var(--accent)" }} onClick={() => goTo("/register", { role: "instructor" })}>
                <GraduationCap className="mr-2 h-4 w-4" /> Soy instructor
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} El Saber HN · Aprende sin límites.</span>
          <a href="#inicio" className="inline-flex items-center gap-1 text-primary hover:opacity-80">
            Volver arriba <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </a>
        </div>
      </footer>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
