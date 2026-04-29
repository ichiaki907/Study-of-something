import { useMemo, useState } from 'react';
import ActionButton from './components/ActionButton';
import AppShell from './components/AppShell';
import BottomNav from './components/BottomNav';
import Card from './components/Card';
import CategoryChips from './components/CategoryChips';
import Header from './components/Header';
import ListItemCard from './components/ListItemCard';
import NoticeBanner from './components/NoticeBanner';
import SearchBox from './components/SearchBox';
import { criteria } from './data/criteria';
import { words } from './data/words';
import { filterBySearchAndCategory, getCategories } from './utils/filter';
import { pickRandom, pickRandomMany } from './utils/random';

export type ViewMode = 'parent'|'child'|'criteria'|'words';
const activeCriteria = criteria.filter((c)=>c.isActive);
const activeWords = words.filter((w)=>w.isActive);

export default function App(){
  const [currentView, setCurrentView] = useState<ViewMode>('parent');
  const [currentCriterion, setCurrentCriterion] = useState(()=>pickRandom(activeCriteria));
  const [currentInitialWord, setCurrentInitialWord] = useState(()=>pickRandom(activeWords));
  const [currentHintWords, setCurrentHintWords] = useState(()=>pickRandomMany(activeWords,5));
  const [isCriterionHidden, setIsCriterionHidden] = useState(false);
  const [criterionSearchText, setCriterionSearchText] = useState('');
  const [wordSearchText, setWordSearchText] = useState('');
  const [selectedCriterionCategory, setSelectedCriterionCategory] = useState('すべて');
  const [selectedWordCategory, setSelectedWordCategory] = useState('すべて');

  const criterionCategories = useMemo(()=>getCategories(criteria),[]);
  const wordCategories = useMemo(()=>getCategories(words),[]);
  const filteredCriteria = filterBySearchAndCategory(criteria, criterionSearchText, selectedCriterionCategory);
  const filteredWords = filterBySearchAndCategory(words, wordSearchText, selectedWordCategory);

  const redrawHints = () => {
    const pool = activeWords.filter((w) => !currentHintWords.some((h) => h.id === w.id));
    setCurrentHintWords(pickRandomMany(pool.length >= 5 ? pool : activeWords, 5));
  };

  return <AppShell><div className='screen'>{currentView==='parent' && <>
    <Header title='キジュンジェネレーター' /><p className='label'>非公式ツール</p><NoticeBanner text='親だけが見てください' />
    <Card className='criterion'><h2>今回のキジュン</h2><p>{isCriterionHidden ? 'キジュンは非表示です' : (currentCriterion?.text ?? 'キジュンがありません')}</p></Card>
    <Card className='initial'><h2>最初の暫定チャンピオン</h2><p>{currentInitialWord?.text ?? 'ワードがありません'}</p></Card>
    <ActionButton onClick={()=>{setCurrentCriterion(pickRandom(activeCriteria, (c)=>c.id===currentCriterion?.id)); setIsCriterionHidden(false);}}>キジュン再抽選</ActionButton>
    <ActionButton onClick={()=>setCurrentInitialWord(pickRandom(activeWords, (w)=>w.id===currentInitialWord?.id))} variant='secondary'>初期ワード再抽選</ActionButton>
    <ActionButton onClick={()=>setIsCriterionHidden((v)=>!v)} variant='danger'>{isCriterionHidden ? 'キジュンを表示' : 'キジュンを隠す'}</ActionButton>
  </>}
  {currentView==='child' && <><Header title='ワードヒント' /><Card><p>思いつかないときのヒントです。自由に別のワードを言ってもOK</p></Card>{currentHintWords.map((w)=><Card key={w.id}><p>{w.text}</p></Card>)}<ActionButton onClick={redrawHints} variant='purple'>ワード案を再抽選</ActionButton></>}
  {currentView==='criteria' && <><Header title='キジュン一覧' /><SearchBox value={criterionSearchText} onChange={setCriterionSearchText} /><CategoryChips categories={criterionCategories} selected={selectedCriterionCategory} onSelect={setSelectedCriterionCategory} />{filteredCriteria.map((c)=><ListItemCard key={c.id} {...c} actionLabel='使う' onAction={()=>{setCurrentCriterion(c); setIsCriterionHidden(false); setCurrentView('parent');}} />)}</>}
  {currentView==='words' && <><Header title='ワード一覧' /><SearchBox value={wordSearchText} onChange={setWordSearchText} /><CategoryChips categories={wordCategories} selected={selectedWordCategory} onSelect={setSelectedWordCategory} />{filteredWords.map((w)=><ListItemCard key={w.id} {...w} actionLabel='設定' onAction={()=>{setCurrentInitialWord(w); setCurrentView('parent');}} />)}</>}
  </div><BottomNav currentView={currentView} onChange={setCurrentView} /></AppShell>
}
