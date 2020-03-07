export class Scrumuser {
    constructor(
        public fullname: string,
        public email : string,
        public password: string,
        public type :string,
        public project_name : string, 
    ){}
}
export class ScrumUserLoginData {
    constructor(
        public email: string,
        public password: string,
        public projname: string,
    ) { }
}
