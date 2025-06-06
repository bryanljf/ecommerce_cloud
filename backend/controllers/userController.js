class UserController{
    constructor(UserService){
        this.userService = UserService;
    }

    //Criar um novo usuário
    async createUser(req,res){
        const {username, email, data_nasc, password} = req.body;
        try{
            const newUser = await this.userService.create(username, email, data_nasc, password);
            res.status(200).json(newUser);
            res.send();
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao gravar o novo usuário.'});
        }
    }

    //Listar todos os usuários (Requer autenticação)
    async findAllUsers(req,res){
        try{
            const AllUsers = await this.userService.findAll();
            res.status(200).json(AllUsers);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar todos os usuários.'});
        }
    }

    //Encontrar um usuário pelo seu ID
    async findUserById(req,res){
        const {id} = req.query;
        try{
            const User = await this.userService.findById(id);
            res.status(200).json(User);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar os usuário pelo ID.'});
        }

    }

    //Método para login
    async login(req,res){
        const {email, password} = req.body;
        try {
            const User = await this.userService.login(email, password);
            if (User) {
                return res.status(200).json(User); 
            }
        } catch (error) {
           return res.status(401).json({ message: error.message });
        }
    }
}

module.exports = UserController;