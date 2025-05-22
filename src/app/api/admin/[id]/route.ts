/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/utils/api2';
import { estados_brevo } from '@/utils/estados';
import { vinculo_options } from '@/utils/vinculos';
import { NextResponse } from 'next/server';

function groupCount(data: any[], key: string) {
    const result: Record<string, number> = {};

    data.forEach(item => {
        const value = item[key] || 'Não informado';
        result[value] = (result[value] || 0) + 1;
    });

    return Object.entries(result).map(([label, value]) => ({ label, value }));
}

function groupByState(data: any[]) {
    const result: Record<string, number> = {};

    data.forEach(item => {
        const stateId = parseInt(item.state);

        const estado = estados_brevo.find(e => e.idBrevo === stateId);
        const sigla = estado ? estado.sigla : 'Não informado';

        result[sigla] = stateId;
    });

    return Object.entries(result).map(([label, value]) => ({ label, value }));
}

function groupByInstitution(data: any[]) {
    const result: Record<string, number> = {};

    data.forEach(item => {

        const vinculo = vinculo_options.find(e => e.value === item.linked_institution);
        const sigla = vinculo ? vinculo.label : 'Não informado';


        result[sigla] = item.linked_institution;
    });

    return Object.entries(result).map(([label, value]) => ({ label, value }));
}

function groupByDate(data: any[], dateKey: string) {
    const result: Record<string, number> = {};

    data.forEach(item => {
        const date = new Date(item[dateKey]).toISOString().split('T')[0];
        result[date] = (result[date] || 0) + 1;
    });

    return Object.entries(result).map(([label, value]) => ({ label, value }));
}

export async function GET() {
    const { data, error } = await supabase.from('users').select('state, occupation, linked_institution, created_at');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const byState = groupByState(data!);
    const byOccupation = groupCount(data!, 'occupation');
    const byLinkedInstitution = groupByInstitution(data!);
    const byCreatedAt = groupByDate(data!, 'created_at');

    return NextResponse.json({
        byState,
        byOccupation,
        byLinkedInstitution,
        byCreatedAt,
    });
}



