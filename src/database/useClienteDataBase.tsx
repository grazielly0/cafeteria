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

    async function consultar(name: string){
        try{
            const query = "select * from pessoa where nome like ?"//Interrogação vai substituir os parâmetros
            const response = await dataBase.getAllSync<ClienteDataBase>(query, `%${name}%`)
            return response
        }catch(error)
        {
            throw(error)
        }
    }//fim do consultar

    async function remove(id:number){
        try{
            await dataBase.execAsync("Delete from pessoa where id = " + id)
        }
        catch(error)
        {
            throw(error)
        }
    }//fim do excluir

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

    return { create, consultar, remove, atualizar }
}