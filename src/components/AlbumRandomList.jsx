import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice'

import uniqueRandomArray from 'unique-random-array'

import disco from '../lib/disco'
import Album from './Album'
import Spinner from './Spinner'

export default class AlbumRandomList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            allAlbums: null,
            randomAlbums: null,
            loading: false,
            numberToGet: 10,
        }
    }

    componentDidMount() {
        this.getAllAlbums()
    }

    getAllAlbums = () => {
        this.setState({
            loading: true,
        })
        disco.getAllAlbums().then((data) => {
            this.setState(
                {
                    allAlbums: data,
                    loading: false,
                },
                this.getRandomAlbums,
            )
        })
    }

    getRandomAlbums = () => {
        const { numberToGet, allAlbums } = this.state
        const allAlbumsRandomized = uniqueRandomArray(allAlbums)
        const randomAlbums = []
        let count = 0
        while (count < numberToGet) {
            const randomAlbum = allAlbumsRandomized()
            randomAlbums.push(randomAlbum)
            count += 1
        }
        this.setState({ randomAlbums })
    }

    render() {
        const { loading, randomAlbums } = this.state
        const numberReturned = randomAlbums ? randomAlbums.length : 0

        return (
            <Row>
                <Col className="mt-3">
                    {loading && <Spinner />}
                    {randomAlbums && numberReturned === 0 && (
                        <div className="text-danger text-lg">
                            <p>No albums found.</p>
                        </div>
                    )}
                    {randomAlbums && numberReturned > 0 && (
                        <>
                            <Button type="button" onClick={this.getRandomAlbums} className="mb-2">
                                <FontAwesomeIcon icon={faDice} /> Refresh List
                            </Button>
                            {randomAlbums.map((album, i) => (
                                <Album
                                    key={album.id}
                                    options={{
                                        sortable: false,
                                        addToPlaylist: true,
                                        showAlbumLink: true,
                                    }}
                                    index={i}
                                    {...album}
                                    rowClassName="border-bottom py-1"
                                />
                            ))}
                            <Button type="button" onClick={this.getRandomAlbums} className="my-2">
                                <FontAwesomeIcon icon={faDice} /> Refresh List
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
        )
    }
}
