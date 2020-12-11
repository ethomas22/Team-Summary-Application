const Employee = require("./Employee");
class Manager extends Employee {
    constructor(name, id, email, number) {
        super(name, id, email)
        this.officeNumber = number
        this.role = "Manager"
    }
    getRole() {
        return this.role
    }
    getOfficeNumber() {
        return this.officeNumber
    }
}

module.exports = Manager