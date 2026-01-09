import Role from "@models/Role";

class RoleService {
  static async getRoles() {
    try {
      const roles = await Role.find({ role: { $ne: "ADMIN" } });

      return { error: false, data: roles };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

export default RoleService;
