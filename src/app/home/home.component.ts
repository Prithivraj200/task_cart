import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';
import { Cart } from '../shared/models/cart';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isAdmin: boolean;
    cartList: Array<Cart>;
    bucketList: Array<{ id: number; name: string }>;

    constructor(
        private homeService: HomeService,
        private authService: AuthService
    ) {
        this.cartList = [];
        this.bucketList = [];
    }

    ngOnInit(): void {
        const { permission } = this.authService.getUserInfo();
        this.isAdmin = permission === 'all' ? true : false;

        this.getCartList();
    }

    getCartList(): void {
        this.homeService.getCartList().subscribe(result => {
            ({ data: this.cartList } = result);
        });
    }

    updateBucketList(id: number, action: string): void {
        if (!this.isAdmin) {
            alert('Permission Denied!');
            return;
        }
        const index = this.cartList.findIndex(cart => cart.id === id);
        if (action === 'add') {
            if (this.cartList[index].quantity > 0) {
                --this.cartList[index].quantity;
                this.bucketList.unshift({
                    id,
                    name: this.cartList[index].name
                });
            }
        } else if (action === 'minus' && this.bucketList.length) {
            const { id: bucketListTop } = this.bucketList[0];
            if (bucketListTop !== id) {
                alert('Invalid item removal');
                return;
            }
            if (this.cartList[index].quantity < 10) {
                ++this.cartList[index].quantity;
                this.bucketList.shift();
            }
        }
    }
}
