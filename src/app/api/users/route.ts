/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/utils/api2'
import { NextResponse, NextRequest } from 'next/server'


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    const cpf = searchParams.get('cpf');

    let query = supabase.from('users').select('*');

    if (id) query = query.eq('id', id);
    if (email) query = query.eq('email', email);
    if (cpf) query = query.eq('cpf', cpf);

    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar usuários:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data);
}



export async function POST(req: NextRequest) {
    try {
        const {
            name,
            last_name,
            cpf,
            email,
            other_email,
            cellphone,
            whatsapp,
            tel,
            state,
            city,
            occupation,
            linked_institution,
            institution,
            job_position,
        } = await req.json()

        const { data, error } = await supabase.from('users').insert([
            {
                name,
                last_name,
                cpf,
                email,
                other_email,
                cellphone,
                whatsapp,
                tel,
                state,
                city,
                occupation,
                linked_institution,
                institution,
                job_position,
            },
        ]).select()



        if (error) {
            console.error('Erro ao criar usuário:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ message: 'Usuário criado com sucesso!', data }, { status: 201 })
    } catch (error: any) {
        console.error('Erro inesperado:', error)
        return NextResponse.json({ error: 'Erro ao criar usuário.' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: any) {
    const { id } = params;

    try {
        const {
            name,
            last_name,
            cpf,
            email,
            other_email,
            cellphone,
            whatsapp,
            tel,
            state,
            city,
            occupation,
            linked_institution,
            institution,
            job_position,
        } = await req.json()

        const { data, error } = await supabase.from('users').update([
            {
                name,
                last_name,
                cpf,
                email,
                other_email,
                cellphone,
                whatsapp,
                tel,
                state,
                city,
                occupation,
                linked_institution,
                institution,
                job_position,
            },
        ]).eq('id', id);

        if (error) {
            console.error('Erro ao atualizar usuário:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ message: 'Usuário atualizado com sucesso!', data }, { status: 200 })
    } catch (error: any) {
        console.error('Erro inesperado:', error)
        return NextResponse.json({ error: 'Erro ao atualizar usuário.' }, { status: 500 })
    }
}

