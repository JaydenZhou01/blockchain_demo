import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Trophy, Award } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'
import Cookies from "js-cookie";

interface RankingData {
    hkid: string;
    score: number;
    rank: number;
}

interface RankTier {
    name: string;
    color: string;
    minScore: number;
}

const rankTiers: RankTier[] = [
    { name: 'Iron', color: 'text-gray-500', minScore: 0 },
    { name: 'Bronze', color: 'text-amber-600', minScore: 100 },
    { name: 'Silver', color: 'text-gray-400', minScore: 300 },
    { name: 'Gold', color: 'text-yellow-500', minScore: 500 },
]

function getRankTier(score: number): RankTier {
    return rankTiers.reduce((acc, tier) => (score >= tier.minScore ? tier : acc), rankTiers[0])
}

function getNextTier(currentTier: RankTier): RankTier | null {
    const currentIndex = rankTiers.findIndex(tier => tier.name === currentTier.name)
    return currentIndex < rankTiers.length - 1 ? rankTiers[currentIndex + 1] : null
}

function calculateProgress(score: number, currentTier: RankTier, nextTier: RankTier | null): number {
    if (!nextTier) return 100
    const range = nextTier.minScore - currentTier.minScore
    const progress = score - currentTier.minScore
    return Math.min(Math.round((progress / range) * 100), 100)
}

export default function RankingPage() {
    const [rankingData, setRankingData] = useState<RankingData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                const userLogin = Cookies.get("userLogin");
                const walletAddress = JSON.parse(userLogin).walletaddress;

                console.log(walletAddress);

                const hkidResponse = await axios.post('http://localhost:5000/getHKID', { walletAddress:walletAddress })

                const hkid = hkidResponse.data.message

                const scoreResponse = await axios.post('http://localhost:5000/getScore', { HKID:hkid })
                const score = scoreResponse.data.message

                const rank = Math.floor(Math.random() * 100) + 1 // Simulated rank between 1-100

                setRankingData({ hkid, score, rank })
            } catch (err) {
                setError('Failed to fetch ranking data. Please try again later.')
                console.error('Error fetching ranking data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchRankingData()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                {error}
            </div>
        )
    }

    if (!rankingData) {
        return null
    }
    const currentTier = getRankTier(rankingData.score)
    const nextTier = getNextTier(currentTier)
    const progress = calculateProgress(rankingData.score, currentTier, nextTier)

    return (
        <div className="bg-orange-50 min-h-screen">
            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="m-4 text-orange-600 hover:text-orange-700 hover:bg-orange-100"
            >
                <ChevronLeft className="mr-2 h-4 w-4"/> Back
            </Button>
            <div className="flex-1 flex items-center justify-center">
                <Card className="w-full max-w-md mx-auto bg-white">
                    <CardHeader className="bg-orange-100 rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-orange-600 flex items-center justify-center">
                            <Trophy className="mr-2 h-6 w-6"/>
                            Your Ranking
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <Award className={`h-16 w-16 ${currentTier.color}`}/>
                            </div>
                            <p className={`text-2xl font-bold mb-2 ${currentTier.color}`}>{currentTier.name} Tier</p>
                            <p className="text-4xl font-bold text-orange-500 mb-4">#{rankingData.rank}</p>

                            <p className="text-lg mb-4">
                                <span className="font-semibold">Score:</span> {rankingData.score}
                            </p>
                            <div className="mb-2">
                                <Progress value={progress} className="w-full"/>
                            </div>
                            <p className="text-sm text-gray-600">
                                {nextTier
                                    ? `${progress}% to ${nextTier.name} Tier (${nextTier.minScore - rankingData.score} points to go)`
                                    : 'Max tier reached'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
            )
            }
