<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-9-10</span></p>
          <p>上次登录地点：<span>广州</span></p>
        </div>
      </el-card>
      <el-card style="margin: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column prop="name" label="课程"> </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买"> </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <el-card
          v-for="(item, index) in countData"
          :key="index"
          :body-style="{ padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">${{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <echart :chartData="echartData.order" style="height: 280px"></echart>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <echart :chartData="echartData.user" style="height: 240px"></echart>
        </el-card>
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
          <echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "@/api/data";
// import * as echarts from "echarts";
import Echart from "@/components/ECharts";
export default {
  data() {
    return {
      userImg: require("../../assets/logo.jpg"),
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: "1234",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: "1234",
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "今月支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今月收藏订单",
          value: "1234",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今月未支付订单",
          value: "1234",
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { data, code } = res.data;
      if (code === 200) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        // 获取数组的key值
        const keyArray = Object.keys(order.data[0]);

        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        // 折线图
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        // 用户图
        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        // 饼图
        this.echartData.video.series = [
            {
              data: data.videoData,
              type: "pie",
            },
          ];
      }
    });
  },
  components: {
    Echart,
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  border-bottom: 1px solid rgba(180, 178, 178, 0.3);
  margin-bottom: 50px;
  padding: 30px 0;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .userinfo {
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin-left: 20px;

    p {
      margin: 0;
    }
    .name {
      font-weight: bold;
      font-size: 30px;
    }
    .access {
      color: gray;
    }
  }
}
.login-info {
  font-size: 16px;
  color: gray;
  span {
    font-size: 14px;
  }
}
.num {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  /deep/ .el-card__body {
    display: flex;
    i {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
  }
  .el-card {
    width: 330px;
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .detail {
    margin-left: 20px;
    .num {
      font-weight: bold;
      font-size: 24px;
    }
    /deep/ .txt {
      font-size: 14px;
      color: gray;
    }
  }
}
.graph {
  display: flex;
  .el-card {
    flex: 1;
    margin-top: 20px;
  }
  .el-card:nth-child(1) {
    margin-right: 40px;
  }
}
</style>