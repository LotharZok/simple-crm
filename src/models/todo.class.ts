export class Todo {
    description: string;
    priority: string;
    status: string;
    assignedTo: string[];
    
    constructor(obj?: any) {
        // Das ? hinter obj bedeutet, daß der Parameter optional ist
        this.description = obj ? obj.description : '';
        this.priority = obj ? obj.priority : '';
        this.status = obj ? obj.status : '';
        this.assignedTo = obj ? obj.assignedTo : '';
    }

    public toJSON() {
        return {
            description: this.description,
            priority: this.priority,
            status: this.status,
            assignedTo: this.assignedTo
        }
    }
}