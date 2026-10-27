/* Product workflows are shared by forms, boards, timelines and reports. */
window.PRODUCTS = (() => {
  const categories = {
    cabinet: {
      name:'廚房櫥櫃',color:'red',defaultStore:'dept',
      stages:{new:'需求確認',measure:'丈量提案',quote:'報價議價',sign:'待簽約',won:'已成交',lost:'已流失'},
      purposes:['初訪','洽談','丈量','送圖','議價','簽約','交屋','售後'],
      types:['散戶案','建商案'],completeAction:'標記成交',
      nextStep:'安排現場丈量與需求確認',
      voiceResult:'已與屋主確認廚房動線及收納需求，現場丈量完成，下次攜帶色板與配置圖再次討論。',
      voiceNext:'攜帶色板與配置圖再次提案'
    },
    stone: {
      name:'晶石板',color:'blue',defaultStore:'stone-team',
      stages:{new:'需求確認',material:'選材／尺寸確認',quote:'報價確認',delivery:'備貨交貨',won:'交貨結案',lost:'未成交'},
      purposes:['初訪','洽談','選材','尺寸確認','報價','交貨','售後'],
      types:['住宅案','建商案','商業空間'],completeAction:'交貨結案',
      nextStep:'確認花色、尺寸與所需片數',
      voiceResult:'已確認牆面使用位置及初步尺寸，客戶選擇白色石紋晶石板，預計需要 48 片，待確認花色與交貨日期。',
      voiceNext:'確認花色、片數及交貨日期'
    },
    wine: {
      name:'酒品',color:'purple',defaultStore:'wine-team',
      stages:{visit:'拜訪洽談',inquiry:'需求詢價',quote:'報價確認',order:'訂單確認',won:'交貨結案',lost:'未成交'},
      purposes:['初訪','洽談','詢價','報價','訂單確認','交貨','售後'],
      types:['餐飲通路','企業採購','活動用酒','個人採購'],completeAction:'交貨結案',
      nextStep:'確認酒款、採購數量與預計交貨日期',
      voiceResult:'已與採購窗口確認活動用酒需求，預計採購紅葡萄酒 12 箱，待確認酒款、報價及交貨日期。',
      voiceNext:'提供酒款報價並確認交貨日期'
    }
  };
  const categoryId=value=>{
    const id=typeof value==='string'?value:value?.category;
    return Object.hasOwn(categories,id)?id:'cabinet';
  };
  const get=value=>categories[categoryId(value)];
  const stagesFor=value=>get(value).stages;
  const stageName=record=>stagesFor(record)[record.stage]||record.stage;
  const stageKeys=(value,mode='all')=>Object.keys(stagesFor(value)).filter(s=>mode==='all'||(mode==='closed'?['won','lost'].includes(s):!['won','lost'].includes(s)));
  function productFromForm(form,category){
    if(category==='cabinet')return null;
    const quantity=Number(form.quantity),name=String(form.productName||'').trim();
    if(!name)throw new Error(category==='stone'?'請填寫晶石板品名。':'請填寫酒品品項。');
    if(!Number.isSafeInteger(quantity)||quantity<1)throw new Error('數量須為大於零的整數。');
    const unit=category==='stone'?'片':form.unit;
    if(category==='wine'&&!['瓶','箱'].includes(unit))throw new Error('酒品單位請選擇瓶或箱。');
    return {name,quantity,unit,specification:String(form.specification||'').trim(),usage:String(form.usage||'').trim()};
  }
  function voiceDraft(record,category){
    const meta=get(record?.category||category),p=record?.product;
    if(!p)return {result:meta.voiceResult,nextStep:meta.voiceNext};
    return {result:categoryId(record)==='stone'?`已確認${p.usage||'牆面'}需求，${p.name}預估 ${p.quantity} 片，後續確認尺寸、花色與交貨日期。`:`已與採購窗口確認${p.name}需求 ${p.quantity} ${p.unit}，後續確認報價與交貨日期。`,nextStep:meta.voiceNext};
  }
  return {categories,categoryId,get,stagesFor,stageName,stageKeys,productFromForm,voiceDraft};
})();
