const $ = (s)=>document.querySelector(s);
const characters = [
  {name:'Shadow', title:'暗影支配者', power:9999, line:'我即是暗影。'},
  {name:'Alpha', title:'七影首席', power:9200, line:'优雅且致命。'},
  {name:'Beta', title:'情报书记官', power:8500, line:'记录一切真相。'},
  {name:'Delta', title:'狂战猎犬', power:8100, line:'用本能撕裂敌人。'},
  {name:'Gamma', title:'组织经营者', power:7600, line:'财富也是力量。'},
  {name:'Epsilon', title:'魔力艺术家', power:7400, line:'完美需要伪装。'},
  {name:'Zeta', title:'兽影潜行者', power:7350, line:'潜伏于月色之下。'},
  {name:'Eta', title:'炼金研究员', power:7000, line:'知识改变战场。'}
];
const works = [
  {name:'月下暗影 PV', heat:9860}, {name:'黑紫角色立绘', heat:8960}, {name:'七影集合插画', heat:8200}, {name:'暗影庭院壁纸', heat:7780},
  {name:'战斗分镜稿', heat:7210}, {name:'组织徽章设计', heat:6900}, {name:'终端 UI 套件', heat:6600}, {name:'二创短片封面', heat:6400}
];
const baseUsers = [
  {name:'Shadow_001', power:9999, contrib:120980},
  {name:'Phantom', power:9420, contrib:98020},
  {name:'NightRaven', power:8760, contrib:76000},
  {name:'MoonBlade', power:8220, contrib:54030},
  {name:'VoidEcho', power:7990, contrib:40020}
];
const users = [...baseUsers];
for(let i=6;i<=100;i++){
  users.push({
    name:`ShadowMember_${String(i).padStart(3,'0')}`,
    power: Math.max(1200, 9800 - i * 73 + (i % 9) * 18),
    contrib: Math.max(6000, 120000 - i * 1017 + (i % 7) * 420)
  });
}
function render(){
  $('#characterGrid').innerHTML = characters.map(c=>`<div class='character card'><div class='portrait'></div><h3>${c.name}</h3><p>${c.title}</p><p>战力：${c.power}</p><small>${c.line}</small></div>`).join('');
  $('#galleryGrid').innerHTML = works.map((w,i)=>`<div class='work card'><div class='thumb'></div><h3>${w.name}</h3><p>热度：${w.heat}</p><p>排名 #${i+1}</p></div>`).join('');
  $('#powerRank').innerHTML = [...users].sort((a,b)=>b.power-a.power).map((u,i)=>`<div class='rank-item'><b>#${i+1} ${u.name}</b><span>${u.power}</span></div>`).join('');
  $('#contributionRank').innerHTML = [...users].sort((a,b)=>b.contrib-a.contrib).map((u,i)=>`<div class='rank-item'><b>#${i+1} ${u.name}</b><span>${u.contrib}</span></div>`).join('');
}
function toggleLogin(show){$('#loginModal').style.display = show ? 'flex':'none'}
function loginUser(){
  const name = $('#username').value || '无名暗影';
  $('#avatarLine').textContent = `“${name}，你的权限已被暗影终端记录。”`;
  toggleLogin(false);
}
function addMessage(){
  const val = $('#msg').value.trim();
  if(!val) return;
  $('#messages').innerHTML = `<p>你：${val}</p>` + $('#messages').innerHTML;
  $('#msg').value='';
}
function particles(){
  const canvas=$('#particles'),ctx=canvas.getContext('2d');let ps=[];
  function resize(){canvas.width=innerWidth;canvas.height=innerHeight}resize();addEventListener('resize',resize);
  for(let i=0;i<90;i++)ps.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+0.5,v:Math.random()*0.7+0.2});
  function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='rgba(166,112,255,.75)';ps.forEach(p=>{p.y-=p.v;if(p.y<0)p.y=innerHeight;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});requestAnimationFrame(draw)}draw();
}
render();particles();

function openPanel(id){
  const panel = document.getElementById(id);
  if(panel) panel.classList.add('active');
}
function closePanel(id){
  const panel = document.getElementById(id);
  if(panel) panel.classList.remove('active');
}
document.addEventListener('click',(e)=>{
  if(e.target.classList && e.target.classList.contains('panel-overlay')){
    e.target.classList.remove('active');
  }
});
function addModalMessage(){
  const input = document.getElementById('modalMsg');
  const val = input.value.trim();
  if(!val) return;
  const modalMessages = document.getElementById('modalMessages');
  modalMessages.innerHTML = `<p>你：${val}</p>` + modalMessages.innerHTML;
  const pageMessages = document.getElementById('messages');
  if(pageMessages) pageMessages.innerHTML = `<p>你：${val}</p>` + pageMessages.innerHTML;
  input.value='';
}


function showWorldSetting(){
  const area = document.getElementById('worldSettingArea');
  if(area){
    area.classList.add('active');
    area.scrollIntoView({behavior:'smooth', block:'start'});
  }
}

function switchWorldSettingTab(id){
  document.querySelectorAll('.world-setting-tab').forEach(tab=>tab.classList.remove('active'));
  document.querySelectorAll('.world-tab-btn').forEach(btn=>btn.classList.remove('active'));

  const target = document.getElementById(id);
  if(target) target.classList.add('active');

  const activeBtn = Array.from(document.querySelectorAll('.world-tab-btn')).find(btn => {
    const call = btn.getAttribute('onclick') || '';
    return call.includes(id);
  });
  if(activeBtn) activeBtn.classList.add('active');
}

// 高审美升级：头像榜自动生成
(function renderAvatarRank(){
  const list = document.getElementById('avatarRankList');
  if(!list) return;
  const names = ['Shadow','Alpha','Beta','Delta','Gamma','Epsilon'];
  list.innerHTML = names.map((name,i)=>`<div><img src="assets/avatar-${String(i+1).padStart(2,'0')}.svg" alt="${name}"><span>#${i+1} ${name}</span></div>`).join('');
})();
