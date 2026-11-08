import { NextRequest, NextResponse } from "next/server";
import { revisarSinAtender } from "@/lib/panel/sin-atender";

// Cada minuto (pg_cron en Supabase, ver docs/panel/README.md): aviso al admin
// por leads sin atender a los 5 min y reasignación a la hora.
// Protegido con CRON_SECRET, igual que el cron de renovaciones.

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  // Solo fuera de producción: simular otra hora para probar el reloj laboral.
  const simular = req.nextUrl.searchParams.get("ahora");
  const ahora =
    simular && process.env.NODE_ENV !== "production" && !Number.isNaN(Date.parse(simular))
      ? new Date(simular)
      : new Date();
  try {
    return NextResponse.json(await revisarSinAtender(ahora));
  } catch (e) {
    console.error("leads-sin-atender:", e);
    return NextResponse.json({ error: "Error revisando leads" }, { status: 500 });
  }
}
