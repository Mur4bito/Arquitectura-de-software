export class ValidationError extends Error {
    constructor(issues) {
        super('Error de validación');
        this.name = 'ValidationError';
        this.issues = issues;
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class InvalidIdError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidIdError';
    }
}