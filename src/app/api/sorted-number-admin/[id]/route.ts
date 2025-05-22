import { supabase } from '@/utils/api2';
import { NextResponse } from 'next/server';


export async function GET() {
    const { data, error } = await supabase.rpc('sorteia_usuario');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
        return NextResponse.json({ error: 'Nenhum número sorteado.' }, { status: 404 });
    }

    return NextResponse.json({ sorteado: data[0] });
}
