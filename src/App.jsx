import { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, Bell, BookOpenCheck, BriefcaseBusiness,
  Building2, Check, ChevronDown, ChevronRight, CircleHelp, Clock3, FileCheck2, FileText,
  FileSearch, Files, GitBranch, LayoutDashboard, Link2, ListChecks, Menu, Plus,
  Search, Settings, ShieldAlert, Sparkles, Users, X, Zap, UploadCloud, ScanSearch, Gavel
} from "lucide-react";

const nav = [
  [LayoutDashboard, "证据指挥中心", "Evidence Center"], [BriefcaseBusiness, "项目总览", "Case Overview"],
  [GitBranch, "经营主张", "Claims"], [Files, "证据库", "Evidence Library"],
  [ShieldAlert, "冲突与风险", "Conflicts & Risks"], [FileSearch, "资料请求", "Requests"],
  [ListChecks, "任务与审批", "Tasks & Approvals"], [Users, "团队与权限", "Team & Access"]
];

const claims = [
  { id:"C-01", title:"拥有300家付费客户（截至2026年6月）", group:"经营表现", status:"conflict", score:83, sources:95, note:"官网口径与合同台账存在差异", verified:"83家可独立验证", risk:"中" },
  { id:"C-02", title:"2025年经常性收入同比增长168%", group:"财务表现", status:"verified", score:94, sources:12, note:"审计报表与银行流水相互印证", verified:"三方证据一致", risk:"低" },
  { id:"C-03", title:"核心推理芯片具备完全自主知识产权", group:"技术壁垒", status:"missing", score:41, sources:7, note:"缺少两项关键专利权属文件", verified:"仍需补充权属证明", risk:"高" },
  { id:"C-04", title:"前五大客户收入占比低于35%", group:"客户结构", status:"risk", score:68, sources:18, note:"实际集中度为51.7%，触发红线", verified:"与管理层陈述冲突", risk:"重大" },
  { id:"C-05", title:"现有现金可支持未来18个月经营", group:"资金安全", status:"verified", score:91, sources:23, note:"基于保守情景测算可覆盖19个月", verified:"压力测试通过", risk:"低" },
];

const evidence = [
  ["E-021", "客户合同与回款台账", "公司数据室", "A", "支持", "2026-08-04", "已复核"],
  ["E-034", "官网客户案例页面", "公开网络", "C", "部分支持", "2026-08-05", "机器提取"],
  ["E-061", "增值税发票抽样清单", "财务专项核验", "A", "支持", "2026-08-05", "已复核"],
  ["E-078", "销售负责人访谈纪要", "管理层访谈", "B", "冲突", "2026-08-06", "待确认"],
];

const statusMap = {
  verified:["已验证", "green"], conflict:["存在冲突", "amber"], missing:["证据缺失", "slate"], risk:["重大风险", "red"]
};

export function App() {
  const [activeNav, setActiveNav] = useState(0);
  const [tab, setTab] = useState("证据图谱");
  const [selected, setSelected] = useState(claims[0].id);
  const [review, setReview] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [evidenceFlow, setEvidenceFlow] = useState(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [newEvidence, setNewEvidence] = useState(false);
  const current = useMemo(() => claims.find(c => c.id === selected), [selected]);

  const startReview = () => { setReview(false); setReviewSent(true); setTimeout(() => setReviewSent(false), 4200); };
  const runEvidenceAnalysis = () => {
    setEvidenceFlow("analyzing"); setAnalysisStep(0);
    [1,2,3,4].forEach((step) => setTimeout(() => setAnalysisStep(step), step * 1050));
    setTimeout(() => { setNewEvidence(true); setSelected("C-04"); setEvidenceFlow("result"); }, 5350);
  };

  return <div className="app-shell">
    <aside className={mobile ? "sidebar open" : "sidebar"}>
      <div className="brand"><div className="brand-mark"><Sparkles size={19}/></div><div><b>PROJECT ORION</b><span>Evidence-to-Decision OS</span></div></div>
      <div className="case-mini"><span>当前投资项目</span><strong>星穹智算科技</strong><small>CASE · OR-2026-018</small></div>
      <nav>{nav.map(([Icon, a, b], i)=><button key={a} className={activeNav===i?"active":""} onClick={()=>{setActiveNav(i);setMobile(false)}}><Icon size={17}/><span>{a}<small>{b}</small></span>{i===4&&<em>6</em>}</button>)}</nav>
      <div className="side-bottom"><button><Settings size={17}/>系统设置</button><div className="profile"><div>LW</div><span><b>林未</b><small>投资经理 · 管理员</small></span><ChevronDown size={15}/></div></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="icon-button menu" onClick={()=>setMobile(true)} aria-label="打开菜单"><Menu size={20}/></button>
        <div className="title-block"><div className="company-icon"><Building2 size={21}/></div><div><div className="eyebrow">企业战略投资项目 · CASE OR-2026-018</div><h1>星穹智算科技 <span>StarCompute AI</span></h1></div></div>
        <div className="top-actions"><button className="icon-button"><Search size={19}/></button><button className="icon-button notification"><Bell size={19}/><i/></button><div className={`decision-chip ${newEvidence?"halted":""}`}><span>Decision Contract</span><b>{newEvidence?"暂停 · 需要重新评估":"有条件进入下一轮"}</b></div><button className="secondary-action" onClick={()=>setEvidenceFlow("upload")}><UploadCloud size={16}/>导入新证据</button><button className="primary" onClick={()=>setReview(true)}><Zap size={16}/>启动投委会复审</button></div>
      </header>

      <section className="subnav"><div>{["证据图谱","关键假设","尽调进度","时间线","审批记录"].map(x=><button onClick={()=>setTab(x)} className={tab===x?"active":""} key={x}>{x}</button>)}</div><span>上次更新 2分钟前 · 证据版本 v3.8</span></section>

      <div className="workspace">
        <section className="graph-panel">
          <div className="section-head"><div><p className="kicker"><Activity size={14}/> LIVE EVIDENCE GRAPH</p><h2>{tab}</h2><p>从经营主张回溯每一条证据、冲突与决策影响</p></div><div className="head-tools"><button><Plus size={15}/>新增主张</button><button><CircleHelp size={16}/></button></div></div>
          <div className="claim-map">
            <div className="root-card"><div className="root-icon"><Building2 size={24}/></div><div><span>目标公司</span><b>星穹智算科技</b><small>AI基础设施 · B轮融资</small></div><div className="root-score"><b>{newEvidence?61:76}</b><span>决策可信度</span></div></div>
            <div className="connector"><i/><i/><i/><i/><i/></div>
            <div className="claim-list">{claims.map(c=>{const [label,tone]=statusMap[c.status];return <button className={`claim-card ${selected===c.id?"selected":""}`} onClick={()=>setSelected(c.id)} key={c.id}>
              <div className={`status-dot ${tone}`}/><div className="claim-content"><span>{c.group} · {c.id}</span><b>{c.title}</b><small>{c.note}</small></div><div className="claim-meta"><span className={`badge ${tone}`}>{label}</span><strong>{c.score}<small>/100</small></strong><ChevronRight size={16}/></div>
            </button>})}</div>
          </div>
          {newEvidence&&<button className="evidence-alert" onClick={()=>setEvidenceFlow("result")}><div><Gavel size={18}/></div><span><b>新证据已改变决策状态</b><small>法院公告 E-096 已关联主张 C-04，触发重大诉讼红线</small></span><em>查看影响 <ArrowRight size={14}/></em></button>}
        </section>

        <aside className="insights">
          <div className="insight-head"><div><p className="kicker">CASE HEALTH</p><h3>案件证据健康度</h3></div><button><ArrowRight size={16}/></button></div>
          <div className="big-score"><div className={`score-ring ${newEvidence?"danger":""}`}><b>{newEvidence?61:76}</b><span>/100</span></div><div><b>{newEvidence?"决策已暂停":"可进入复审"}</b><span>{newEvidence?"新证据 -15":"较昨日 +4"}</span><small>{newEvidence?"3项重大风险待人工判断":"2项重大风险待人工判断"}</small></div></div>
          <div className="stats"><div><b>27</b><span>经营主张</span></div><div><b className="green-text">18</b><span>已验证</span></div><div><b className="amber-text">4</b><span>存在冲突</span></div><div><b>3</b><span>证据缺失</span></div></div>
          <div className="risk-title"><b><AlertTriangle size={15}/>重大风险</b><span>{newEvidence?"3项":"2项"}</span></div>
          {newEvidence&&<button className="risk-card new-risk"><div className="risk-icon"><Gavel size={18}/></div><div><b>新增重大诉讼未在材料中披露</b><span>涉案金额 1,860 万元，超过规则阈值</span><small>影响：持续经营假设 H-03</small></div><ChevronRight size={15}/></button>}
          <button className="risk-card"><div className="risk-icon"><ShieldAlert size={18}/></div><div><b>客户集中度突破投资红线</b><span>前五大客户占比 51.7%，高于规则上限 35%</span><small>影响：收入质量假设 H-03</small></div><ChevronRight size={15}/></button>
          <button className="risk-card"><div className="risk-icon"><Link2 size={18}/></div><div><b>核心专利权属链不完整</b><span>2项关键专利仍登记于关联公司名下</span><small>影响：技术壁垒假设 H-07</small></div><ChevronRight size={15}/></button>
          <div className="next-action"><div className="risk-title"><b><Clock3 size={15}/>下一步行动</b><span>5项</span></div><label><span><i>1</i>补充前五大客户合同与回款凭证</span><b>今天</b></label><label><span><i>2</i>确认核心专利转让协议原件</span><b>明天</b></label><button>查看全部待办 <ArrowRight size={14}/></button></div>
          <div className="progress"><div><span>尽调进度</span><b>68%</b></div><i><em/></i><small>61 / 90 项检查已完成</small></div>
        </aside>

        <section className="detail-panel">
          <div className="detail-title"><div><span className="badge amber">存在冲突</span><small>{current.id} · {current.group}</small><h3>{current.title}</h3><p>{current.verified}。系统不会替代投资经理下结论，当前建议提交人工复核。</p></div><div className="evidence-score"><span>证据可信度</span><b>{current.score}</b><small>共 {current.sources} 个证据节点</small></div></div>
          <div className="table-wrap"><table><thead><tr><th>证据编号</th><th>证据与来源</th><th>来源类型</th><th>等级</th><th>与主张关系</th><th>获取时间</th><th>复核状态</th></tr></thead><tbody>{evidence.map((row,i)=><tr key={row[0]}><td><b>{row[0]}</b></td><td><span className="file-cell"><FileCheck2 size={15}/>{row[1]}</span></td><td>{row[2]}</td><td><span className={`tier tier-${row[3].toLowerCase()}`}>{row[3]}</span></td><td><span className={row[4]==="冲突"?"red-text":row[4]==="部分支持"?"amber-text":"green-text"}>{row[4]}</span></td><td>{row[5]}</td><td>{row[6]}</td></tr>)}</tbody></table></div>
        </section>
      </div>
    </main>

    {mobile&&<button className="scrim" onClick={()=>setMobile(false)} aria-label="关闭菜单"/>}
    {evidenceFlow&&<div className="evidence-layer"><div className="evidence-modal">
      <button className="modal-close" onClick={()=>setEvidenceFlow(null)}><X size={18}/></button>
      {evidenceFlow==="upload"&&<><div className="modal-icon cyan"><UploadCloud size={25}/></div><p className="kicker">CONTINUOUS DUE DILIGENCE</p><h2>导入外部新证据</h2><p>系统将识别事实、关联经营主张，并重新运行投资规则与风险判断。</p><div className="drop-zone"><FileText size={30}/><div><b>法院公告_星穹智算科技_2026-08-06.pdf</b><span>官方司法平台 · PDF · 1.8 MB</span></div><Check size={18}/></div><div className="evidence-preview"><span>来源可信度 <b>A</b></span><span>独立第三方 <b>是</b></span><span>获取时间 <b>刚刚</b></span></div><div className="modal-actions"><button onClick={()=>setEvidenceFlow(null)}>取消</button><button className="primary" onClick={runEvidenceAnalysis}><ScanSearch size={16}/>开始证据核验</button></div></>}
      {evidenceFlow==="analyzing"&&<><div className="analysis-orbit"><ScanSearch size={29}/><i/><i/><i/></div><p className="kicker">MULTI-AGENT VERIFICATION</p><h2>证据正在穿过决策链</h2><p>每一步结论都将保留来源、规则命中与推理轨迹。</p><div className="agent-steps">{[["Document Agent","提取 14 个事实与 6 个实体"],["Claim Agent","关联 C-04 与持续经营假设 H-03"],["Evidence Agent","识别企业材料与司法公告强冲突"],["Risk Agent","命中重大诉讼披露红线"]].map((x,i)=><div className={analysisStep>i?"done":analysisStep===i?"running":""} key={x[0]}><span>{analysisStep>i?<Check size={15}/>:i+1}</span><b>{x[0]}</b><small>{x[1]}</small></div>)}</div><div className="analysis-progress"><i style={{width:`${Math.min(analysisStep*25,100)}%`}}/></div></>}
      {evidenceFlow==="result"&&<><div className="result-mark"><AlertTriangle size={28}/></div><p className="kicker red-kicker">DECISION STATE CHANGED</p><h2>新证据使原决策条件失效</h2><p>法院公告与企业“无重大未决诉讼”的经营主张发生强冲突，系统已暂停 Decision Contract，等待人工判断。</p><div className="impact-grid"><div><span>决策可信度</span><b><del>76</del> 61</b><small>-15</small></div><div><span>重大风险</span><b><del>2</del> 3</b><small>+1</small></div><div><span>Decision Contract</span><b className="red-text">PAUSED</b><small>需重新评估</small></div></div><div className="claim-impact"><span>E-096</span><div><b>重大诉讼公告 · 涉案 1,860 万元</b><small>关联 C-04 / H-03 · 规则 R-LEGAL-07 · A级证据</small></div><em>强冲突</em></div><div className="modal-actions"><button onClick={()=>setEvidenceFlow(null)}>返回证据图谱</button><button className="primary" onClick={()=>{setEvidenceFlow(null);setReview(true)}}><Gavel size={16}/>进入人工决策门</button></div></>}
    </div></div>}
    {review&&<div className="modal-layer"><div className="modal"><button className="modal-close" onClick={()=>setReview(false)}><X size={18}/></button><div className="modal-icon"><BookOpenCheck size={25}/></div><p className="kicker">HUMAN DECISION GATE</p><h2>启动投委会人工复审</h2><p>ORION 已整理 27 条经营主张、95 个证据节点和 2 项重大风险。系统将生成带完整证据引用的复审包，但不会自动作出投资决定。</p><div className="review-summary"><span><Check size={15}/>锁定当前证据版本 v3.8</span><span><Check size={15}/>通知 3 位投委会成员</span><span><Check size={15}/>保留全部人工修改与审批记录</span></div><div className="modal-actions"><button onClick={()=>setReview(false)}>暂不启动</button><button className="primary" onClick={startReview}><Zap size={16}/>确认并创建复审</button></div></div></div>}
    {reviewSent&&<div className="toast"><div><Check size={18}/></div><span><b>投委会复审已创建</b><small>复审包 OR-2026-018-R2 已发送给 3 位成员</small></span><button onClick={()=>setReviewSent(false)}><X size={15}/></button></div>}
  </div>;
}
