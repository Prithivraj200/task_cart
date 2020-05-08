import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../shared/models/user';
import { Response } from './../shared/models/response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user: User;
    constructor(private http: HttpClient) {}

    setUserInfo(userInfo: User): void {
        this.user = userInfo;
    }

    getUserInfo(): User | undefined {
        return {
            name: '',
            permission: 'all'
        };
        // return this.user;
    }

    checkLogin(payload: {
        username: string;
        password: string;
    }): Observable<Response> {
        return this.http.get<Response>(`./assets/mock/login.json`).pipe(
            map((userList: any) => {
                let isFound = false;
                let userDetails: User;
                for (const user in userList) {
                    if (user) {
                        const { name, password } = userList[user];
                        const { username, password: userPassword } = payload;
                        if (name === username && password === userPassword) {
                            isFound = true;
                            delete userList[user].password;
                            userDetails = userList[user];
                            break;
                        }
                    }
                }
                if (isFound) {
                    return {
                        data: userDetails,
                        statusCode: 200
                    };
                }
                return {
                    data: {},
                    message: 'Invalid username or password!',
                    statusCode: 400
                };
            })
        );
    }
}
