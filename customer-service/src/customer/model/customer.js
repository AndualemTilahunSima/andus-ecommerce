class Customer {
    #firstName;
    #lastName;
    #email;
    #address;

    constructor(firstName, lastName, email, address) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#address = address;
    }

    // Getter methods to access private fields
    getFirstName() {
        return this.#firstName;
    }

    getLastName() {
        return this.#lastName;
    }

    getEmail() {
        return this.#email;
    }

    getAddress() {
        return this.#address;
    }
}
export default Customer;