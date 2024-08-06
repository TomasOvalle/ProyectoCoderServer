import dao from "../data/dao.factory.js";
import UsersDTO from "../dto/users.dto.js";
const { users } = dao

class UsersRepository {
    constructor(manager) {
        this.model = manager;
    }

    createRepository = async (data) => {
        try {
            data = new UsersDTO(data);
            const one = await this.model.create(data);
            return one;
        } catch (error) {
            throw error;
        }
    };

    // se cambio model.read por model.find y role paso a {role} para probar ciertas cuestiones
    readRepository = async (role) => {
        try {
            const all = await this.model.find({ role });
            return all;
        } catch (error) {
            throw error;
        }
    };

    //uid paso a ser filter para probar ciertas cuestiones de supertest
    readOneRepository = async (filter) => {
        try {
            const one = await this.model.readOne(filter);
            return one;
        } catch (error) {
            throw error;
        }
    };

    readByEmailRepository = async (email) => {
        try {
            const one = await this.model.readByEmail(email);
            return one;
        } catch (error) {
            throw error;
        }
    };

    updateRepository = async (uid, data) => {
        try {
            const one = await this.model.update(uid, data);
            return one;
        } catch (error) {
            throw error;
        }
    };

    destroyRepository = async (uid) => {
        try {
            const one = await this.model.destroy(uid);
            return one;
        } catch (error) {
            throw error;
        }
    };
}

const usersRepository = new UsersRepository(users);
export default usersRepository;