import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from './ui/pagination'
import { Button } from './ui/button'

interface PaginationComponentProps {
    cursor: number
    setCursor: React.Dispatch<React.SetStateAction<number>>
    hasNextPage: boolean
    hasPrevPage: boolean
}

const PaginationComponent = ({ cursor, setCursor, hasNextPage, hasPrevPage }: PaginationComponentProps) => {
    return (
        <Pagination>
            <PaginationContent>

                <PaginationItem>
                    <Button disabled={cursor === 1 || hasPrevPage} onClick={() => setCursor(cursor === 1 ? 1 : cursor - 1)} variant={"outline"}>Previous</Button>
                </PaginationItem>

                {cursor !== 1
                    ? <PaginationItem>
                        <Button onClick={() => setCursor(1)} variant={"outline"}>1</Button>
                    </PaginationItem>
                    : null
                }

                <PaginationItem>
                    <Button variant={"default"}>{cursor}</Button>
                </PaginationItem>

                <PaginationItem>
                    <Button onClick={() => setCursor(cursor + 1)} variant={"outline"}>{cursor + 1}</Button>
                </PaginationItem>

                <PaginationItem>
                    <Button onClick={() => setCursor(cursor + 2)} variant={"outline"}>{cursor + 2}</Button>
                </PaginationItem>

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                    {/* <PaginationPrevious onClick={() => setCursor(cursor === 1 ? 1 : cursor - 1)} href={""} /> */}
                    <Button disabled={hasNextPage === false} onClick={() => setCursor(cursor + 1)} variant={"outline"}>Next</Button>
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent
