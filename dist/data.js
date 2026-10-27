/* All names, events and amounts in this file are fictional demo fixtures. */
window.DEMO = (() => {
  const stages = { new: '需求確認', measure: '丈量提案', quote: '報價議價', sign: '待簽約', won: '已成交', lost: '已流失' };
  const purposes = ['初訪', '洽談', '丈量', '送圖', '議價', '簽約', '交屋', '售後'];
  const reasons = ['價格', '時程', '找別家', '沒消息', '其他'];
  const sources = ['官網預約', 'LINE 官方帳號', '樣品屋', '門市轉介', '業務開發'];
  const cities = ['台北信義','台北內湖','台北士林','新北板橋','新北新店','新北林口','桃園藝文','桃園中壢','新竹竹北','新竹東區','苗栗頭份','台中西屯','台中北屯','台中南屯','彰化員林','南投草屯','雲林斗六','嘉義西區','台南東區','台南安平','高雄左營','高雄鼓山','高雄鳳山','屏東市區','宜蘭羅東','花蓮吉安','台東市區','新北三重','台中豐原','台南永康'];
  const staffNames = ['林品妤','陳奕安','張育瑄','王柏鈞','黃詩涵','李承恩','吳怡萱','劉彥廷','蔡佩蓉','楊子翔','許家瑜','鄭宇軒'];
  const clientNames = ['陳先生','林小姐','張先生','王小姐','黃先生','李小姐','吳先生','劉小姐','蔡先生','楊小姐','許先生','鄭小姐','謝先生','郭小姐','洪先生','邱小姐'];
  function seed() {
    const now = Date.now();
    const at = (days, hours=0) => new Date(now + days*86400000 + hours*3600000).toISOString();
    const stores = cities.map((name,i)=>({id:`s${i+1}`,name:`${name}店`,region:i<10?'北區':i<18?'中區':'南東區'}));
    stores.push({id:'dept',name:'進口廚具部',region:'直營部門'});
    const staff = stores.flatMap((s,i)=>[0,1].map(j=>({id:`u${i*2+j+1}`,name:staffNames[(i*2+j)%staffNames.length],storeId:s.id,color:['red','purple','blue','green','orange'][(i+j)%5]})));
    const projects = ['映日森邸','青山序','悅河匯','榕樹之丘','光境一號','天河首席'].map((name,i)=>({
      id:`p${i+1}`,name,developer:['映日建設','青山開發','河岸建設','榕景建築','光境建設','天河開發'][i],
      city:['台北市信義區','新北市林口區','台中市西屯區','台南市東區','新竹縣竹北市','高雄市鼓山區'][i],
      color:['red','purple','blue','green','orange','pink'][i],
      units:Array.from({length:[16,20,12,16,24,12][i]},(_,j)=>({id:`p${i+1}-u${j+1}`,name:`${String.fromCharCode(65+j%2)}棟 ${Math.floor(j/2)+2}F`}))
    }));
    const caseStages=['quote','measure','new','sign','won','lost'];
    const cases=Array.from({length:30},(_,i)=>{
      const p=projects[(i+Math.floor(i/6))%6],storeId=i%8===0?'dept':stores[i%30].id;
      const stage=caseStages[i%6];
      return {id:`c${i+1}`,code:`BL-${new Date().getFullYear()}-${String(i+1).padStart(3,'0')}`,
        title:i<6?`${p.name}｜公設與樣品屋`:`${clientNames[i%16]}｜${p.name}`,
        client:i<6?p.developer:clientNames[i%16],phone:`09XX-XXX-${String(i+1).padStart(3,'0')}`,
        type:i<6?'建商案':'散戶案',projectId:p.id,unitIds:i<6?p.units.slice(0,4).map(u=>u.id):[p.units[4+Math.floor((i-6)/6)].id],
        storeId,ownerId:staff.find(u=>u.storeId===storeId).id,stage,
        amount:i<6?[1680000,1280000,960000,1450000,1880000,1120000][i]:[268000,385000,428000,560000,328000,480000][i%6],
        createdAt:at(-15-i*3),updatedAt:at(-(i%5)),nextAt:at((i%7)-2),nextStep:['確認設計圖與五金選配','帶色板到現場討論','安排現場複丈','確認合約內容與交期'][i%4],
        wonAt:stage==='won'?at(-2-i%9):null,lostReason:stage==='lost'?reasons[i%5]:null,
        lostNote:stage==='lost'?'屋主已有合作廠商，保留後續服務機會。':'',opportunityId:i<8?`o${i+1}`:null};
    });
    const parties=Array.from({length:13},(_,i)=>({id:`pt${i+1}`,name:i<4?['沐光室內設計','構室設計事務所','映日建設','築禾工程'][i]:clientNames[(i+3)%16],type:i<4?['設計公司','設計公司','建商','工班'][i]:'屋主',contact:staffNames[(i+4)%12],phone:`09XX-XXX-${String(100+i).padStart(3,'0')}`}));
    const opportunities=Array.from({length:15},(_,i)=>({id:`o${i+1}`,partyId:parties[i%13].id,
      title:i<8?cases[i].title:['沐光設計｜大安住宅合作','構室設計｜新竹接待中心','映日建設｜二期廚具提案','築禾工程｜樣品屋設備','林小姐｜老屋廚房更新','沐光設計｜台中住宅合作','黃先生｜進口廚具洽詢'][i-8],
      storeId:i>=8?'dept':cases[i].storeId,ownerId:i>=8?staff.find(u=>u.storeId==='dept').id:cases[i].ownerId,
      status:i<8?'converted':i===13?'lost':'active',caseId:i<8?cases[i].id:null,
      createdAt:at(-25-i),nextAt:at((i%6)-2),nextStep:'帶產品型錄與配置草案再次洽談',lostReason:i===13?'時程':null}));
    const leads=Array.from({length:46},(_,i)=>{
      const storeId=i%7===0&&i<11?null:stores[(i*3)%30].id;
      const converted=i>=30&&i<40,closed=i>=43;
      const age=i<11?0:Math.floor((i-8)/7)*28+i%6;
      const createdAt=converted?new Date(new Date(cases[i-30].createdAt).getTime()-86400000).toISOString():i<11?at(0,-i-1):at(-age,-2);
      const contactAt=i>10?new Date(new Date(createdAt).getTime()+2*3600000).toISOString():null;
      return {id:`l${i+1}`,name:clientNames[i%16],phone:`09XX-XXX-${String(200+i).padStart(3,'0')}`,
        need:['新成屋廚房規劃','老屋廚房翻新','進口廚具諮詢','建商樣品屋提案','廚房收納與配置'][i%5],
        source:sources[i%5],city:cities[(i*3)%30],storeId:converted?cases[i-30].storeId:storeId,
        ownerId:converted?cases[i-30].ownerId:storeId?staff.find(u=>u.storeId===storeId).id:null,
        status:converted?'converted':closed?'lost':contactAt?'contacted':'pending',
        createdAt,dueAt:new Date(new Date(createdAt).getTime()+4*3600000).toISOString(),
        contactAt,caseId:converted?cases[i-30].id:null,lostReason:closed?reasons[i%5]:null,
        note:['希望先確認一字型廚房的收納配置。','假日方便到店，想看實際門板材質。','預計年底交屋，請協助安排丈量。','希望取得進口設備與五金建議。'][i%4]};
    });
    const visits=Array.from({length:38},(_,i)=>{
      const c=cases[i%30];return {id:`v${i+1}`,caseIds:[c.id],opportunityId:c.opportunityId,partyId:null,projectId:c.projectId,
        unitIds:c.unitIds,storeId:c.storeId,ownerId:c.ownerId,at:at(-(i%12),-i%7),purpose:purposes[i%8],
        result:['已確認廚房動線，屋主偏好暖白門板與石紋檯面。','現場複丈完成，管線位置與原始圖面有些差異，已拍照記錄。','完成配置說明，客戶希望再比較兩種五金方案。','已提供第二版報價，正在確認設備交期與簽約時間。'][i%4],
        nextStep:c.nextStep,nextAt:c.nextAt,note:i%3===0?'下次拜訪請攜帶實體色板。':'',photos:[]};
    });
    visits.push({id:'v39',caseIds:[],opportunityId:'o9',partyId:'pt1',projectId:null,unitIds:[],storeId:'dept',ownerId:staff.find(u=>u.storeId==='dept').id,at:at(-1),purpose:'初訪',result:'與設計總監交流合作方式，對進口廚具與一站式出圖很有興趣。',nextStep:'帶產品型錄與配置草案再次洽談',nextAt:at(2),note:'尚未立案，先保留洽談紀錄。',photos:[]});
    const tasks=cases.filter(c=>!['won','lost'].includes(c.stage)).map((c,i)=>({id:`t${i+1}`,caseId:c.id,opportunityId:null,storeId:c.storeId,ownerId:c.ownerId,title:c.nextStep,dueAt:c.nextAt,status:i===11?'done':'todo'}));
    opportunities.filter(o=>o.status==='active').forEach((o,i)=>tasks.push({id:`to${i+1}`,caseId:null,opportunityId:o.id,storeId:o.storeId,ownerId:o.ownerId,title:o.nextStep,dueAt:o.nextAt,status:'todo'}));
    const events=cases.flatMap((c,i)=>[{id:`e${i}-1`,caseId:c.id,opportunityId:c.opportunityId,kind:'create',title:'案件已建立',detail:`由${stores.find(s=>s.id===c.storeId).name}承接，開始追蹤合作機會。`,at:c.createdAt,actorId:c.ownerId},
      {id:`e${i}-2`,caseId:c.id,kind:'design',title:'配置圖已完成',detail:'廚房配置圖 v2 已加入案件，等待客戶確認。',at:at(-8-i%5),actorId:c.ownerId},
      {id:`e${i}-3`,caseId:c.id,kind:'quote',title:'報價版本已更新',detail:`報價 v2，金額 NT$ ${c.amount.toLocaleString('en-US')}（模擬資料）。`,at:at(-5-i%3),actorId:c.ownerId}]);
    const risks=[4,10,16,22,0,3,8,5,28].map((index,i)=>({id:`r${i+1}`,caseId:cases[index].id,opportunityId:cases[index].opportunityId,createdAt:at(-12-i),
      reason:['門市無繪圖人力，原擬轉交在地廠商','客戶已有競品報價，價格落差較大','建商要求縮短交期，擬改找其他供應商'][i%3],
      action:['總部協助出圖，門市重新向客戶提案','調整配置與五金組合，保留核心需求','進口廚具部協調設備交期，提出分批方案'][i%3],
      status:i<3?'confirmed':i===3||i===8?'pending':i===7?'lost':'tracking',reviewedAt:i<3?at(-1):null,
      note:i<3?'已核對案件成交與介入紀錄，確認留單。':'持續追蹤介入結果。'}));
    return {version:1,createdAt:new Date(now).toISOString(),stores,staff,parties,opportunities,leads,cases,projects,visits,tasks,events,risks};
  }
  return {seed,stages,purposes,reasons,sources};
})();
