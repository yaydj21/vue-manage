import Mock from 'mockjs';

let List = [];
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                })
            )

        }
        return {
            code: 200,
            data: {
                videoData: [
                    {
                        name: '小米',
                        value: 3999
                    },
                    {
                        name: '苹果',
                        value: 5999
                    },
                    {
                        name: 'vivo',
                        value: 1999
                    },
                    {
                        name: 'oppo',
                        value: 1599
                    },
                    {
                        name: '魅族',
                        value: 2999
                    },
                    {
                        name: '三星',
                        value: 4999
                    },
                ],
                userData: [
                    {
                        date: '周一',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周二',
                        new: 10,
                        active: 200
                    },
                    {
                        date: '周三',
                        new: 12,
                        active: 200
                    },
                    {
                        date: '周四',
                        new: 60,
                        active: 200
                    },
                    {
                        date: '周五',
                        new: 65,
                        active: 200
                    },
                    {
                        date: '周六',
                        new: 53,
                        active: 200
                    },
                    {
                        date: '周日',
                        new: 33,
                        active: 200
                    },
                ],
                orderData: {
                    date: ['20221001', '20221002', '20221003', '20221004', '20221005', '20221006', '20221007'],
                    data: List
                },
                tableData: [
                    {
                        name: "oppo",
                        todayBuy: 120,
                        monthBuy: 400,
                        totalBuy: 940,
                    },
                    {
                        name: "vivo",
                        todayBuy: 210,
                        monthBuy: 500,
                        totalBuy: 870,
                    },
                    {
                        name: "apple",
                        todayBuy: 150,
                        monthBuy: 200,
                        totalBuy: 650,
                    },
                    {
                        name: "小米",
                        todayBuy: 300,
                        monthBuy: 700,
                        totalBuy: 850,
                    },
                    {
                        name: "三星",
                        todayBuy: 400,
                        monthBuy: 900,
                        totalBuy: 1231,
                    },
                    {
                        name: "魅族",
                        todayBuy: 650,
                        monthBuy: 100,
                        totalBuy: 320,
                    },
                ]
            }
        }
    }

}