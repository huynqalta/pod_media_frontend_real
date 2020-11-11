import { LanguageContext } from '@shared/Context/Language'
import { useTranslate } from '@shared/Hook'
import { CampaignTranslateKey } from '@shared/TranslateKey/ImportTranslateKey'
import React, { useContext } from 'react'
import ListCode from '../components/ListCode'

interface Props {
    
}

const CampaignDetail = (props: Props) => {

    const { language } = useContext(LanguageContext);
    return (
        <div>
              <ListCode
          useTranslate={useTranslate(CampaignTranslateKey)}
          language={language}
        />
        </div>
    )
}

export default CampaignDetail
