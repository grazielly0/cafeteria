import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ioqmugedsxyximfdhjzp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvcW11Z2Vkc3h5eGltZmRoanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTYzMzYsImV4cCI6MjA2NjM3MjMzNn0.hWDaxjibqlA4frjLW3iw-cZFtpZ007gqWESkVeziVdo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});














import { useSQLiteContext } from 'expo-sqlite';



export type ClienteDataBase = {
    id: number
    nome: string
    telefone: string
   email: string
   senha: string
}

export function useClienteDataBase(){
    const dataBase = useSQLiteContext()

    async function create(data: Omit<ClienteDataBase, "id">){
        const statement = await dataBase.prepareAsync(
            "insert into pessoa(nome, telefone, email, senha) values($nome, $telefone, $email, $senha)"
        )

        try{
            const result = await statement.executeAsync({
                $nome: data.nome,
                $telefone: data.telefone,
                $email: data.email, 
                $senha: data.senha
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        }catch(error){
            throw error
        }finally{
            await statement.finalizeAsync()
        }
    }//fim do inserir

   

    async function atualizar(data: ClienteDataBase){
        const statement = await dataBase.prepareAsync(
            "update pessoa set nome = $nome, telefone = $telefone, email = $email, senha= $senha where id = $id"
        )

        try{
            await statement.executeAsync({
                $id: data.id,
                $nome: data.nome,
                $telefone: data.telefone,
                $email: data.email,
                $senha: data.senha
            })
        }catch(error){
            throw error
        }finally{
            await statement.finalizeAsync()
        }
    }//fim do atualizar

    return { create, atualizar }
}