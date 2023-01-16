<template>
  <div class="card bg-secondary mt-3">
    <div class="card-body">
      <div class="row">
        <div class="col-9">
          <h2>
            <img class="d-inline-block w-25" :src="imageUrl" alt="Change image">
            <strong class="font-monospace me-2">{{ stockCode }}</strong>
            <small>{{ stockProps.fullName }}</small>
          </h2>
          <h2 class="animate-flicker">
            <span class="edinbuck-sign"></span>{{ stockProps.currentPrice }}
            <small>
              <span class="badge text-dark me-2" :class="{ 'bg-danger': stockProps.pctChange < 0, 'bg-warning': stockProps.pctChange === 0, 'bg-success': stockProps.pctChange > 0 }">{{ (stockProps.pctChange < 0 ? "" : "+") + stockProps.pctChange }}%</span>
            </small>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayBoardStockListItem",
  props: [
      'stockCode',
      'stockProps'
  ],
  computed: {
    imageUrl() {
      if (this.stockProps.pctChange < 0)
        return '/src/assets/down.svg'
      else if (this.stockProps.pctChange > 0)
        return '/src/assets/up.svg'
      else
        return '/src/assets/flat.svg'
    }
  }
}
</script>

<style scoped>
  .edinbuck-sign {
      background-image: url(../../../assets/edinbuck.svg);
      display: inline-block;
      background-size: contain;
      position: relative;      top: 5px;
      width: 16px;
      height: 32px;
      margin-right: 4px;
  }

  @keyframes flickerAnimation {
    0%   { opacity:1; }
    50%  { opacity:0.4; }
    100% { opacity:1; }
  }

  @-o-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0.4; }
    100% { opacity:1; }
  }

  @-moz-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0.4; }
    100% { opacity:1; }
  }

  @-webkit-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0.4; }
    100% { opacity:1; }
  }

  .animate-flicker {
     -webkit-animation: flickerAnimation 1s infinite;
     -moz-animation: flickerAnimation 1s infinite;
     -o-animation: flickerAnimation 1s infinite;
      animation: flickerAnimation 1s infinite;
  }
</style>
