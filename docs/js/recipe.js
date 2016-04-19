var bassdrum = {
    name: 'VCA',
    gain: 0.9,
    input: {
        name: 'Delay',
        param: {
            delayTime: 0.3,
            feedback: 0.4,
            mix: 0.3
        },
        input: {
            name: 'Env',
            param:{
                gain: 3,
                attack: 0.01,
                decay: 0.2,
                sustain: 0,
                release: 0.1,
            },
            input: {
                name: 'Mixer',
                input: [
                    {
                        name: 'VCF',
                        param: {
                            frequency: 4000,
                            type: 'bandpass',
                            Q: 2,
                            gain: 1
                        },
                        input: {
                            name: 'VCA',
                            gain: 0.03,
                            input: {
                                name: 'Noise'
                            }
                        }
                    },
                    {
                        name: 'VCF',
                        param: {
                            frequency: 600,
                            type: 'bandpass',
                            Q: 9,
                            gain: 1
                        },
                        input: {
                            name: 'VCA',
                            gain: 0.09,
                            input: {
                                name: 'Noise'
                            }
                        }
                    },
                    {
                        name: 'VCO',
                        param: {
                            frequency: 60,
                            type: 'sine'
                        }
                    }
                ]
            }
        }
    }
};

var snare = {
    name: 'VCA',
    gain: 0.9,
    input: {
        name: 'Delay',
        param: {
            delayTime: 0.3,
            feedback: 0.4,
            mix: 0.3
        },
        input:{
            name: 'Env',
            param:{
                gain: 5,
                attack: 0.01,
                decay: 0.2,
                sustain: 0,
                release: 0.1,
            },
            input: {
                name: 'Mixer',
                input: [
                    {
                        name: 'VCF',
                        param: {
                            frequency: 1000,
                            type: 'bandpass',
                            Q: 5,
                            gain: 1
                        },
                        input: {
                            name: 'Noise'
                        }
                    },
                    {
                        name: 'VCO',
                        param: {
                            frequency: 50,
                            type: 'sine'
                        }
                    }
                ]
            }
        }
    }
};

var highhat = {
    name: 'VCA',
    gain: 0.9,
    input: {
        name: 'Delay',
        param: {
            delayTime: 0.3,
            feedback: 0.4,
            mix: 0.3
        },
        input:{
            name: 'Env',
            param:{
                gain: 1,
                attack: 0.01,
                decay: 0.2,
                sustain: 0,
                release: 0.1,
            },
            input: {
                name: 'VCF',
                param: {
                    frequency: 4000,
                    type: 'bandpass',
                    Q: 3,
                    gain: 1
                },
                input: {
                    name: 'Noise'
                }
            }
        }
    }
};

var tone1 = {
    name: 'VCA',
    gain: 0.9,
    input: {
        name: 'Env',
        param:{
            gain: 1,
            attack: 0,
            decay: 0.1,
            sustain: 0.5,
            release: 0.1,
        },
        input: {
            name: 'VCF',
            param: {
                frequency: 400,
                type: 'bandpass',
                Q: 8,
                gain: 1
            },
            input: {
                name: 'VCO',
                param: {
                    frequency: 'cv',
                    type: 'triangle'
                }
            }
        }
    }
};

var tone2 = {
    name: 'VCA',
    gain: 0.9,
    input: {
        name: 'Env',
        param:{
            gain: 1,
            attack: 0,
            decay: 0.1,
            sustain: 0.5,
            release: 0.1,
        },
        input: {
            name: 'VCF',
            param: {
                frequency: 400,
                type: 'bandpass',
                Q: 8,
                gain: 1
            },
            input: {
                name: 'VCO',
                param: {
                    frequency: 'cv',
                    type: 'square'
                }
            }
        }
    }
};

var tone3 = {
    name: 'VCA',
    gain: 0.9,
    input: {
        name: 'Env',
        param:{
            gain: 1,
            attack: 0,
            decay: 0.1,
            sustain: 0.5,
            release: 0.1,
        },
        input: {
            name: 'VCF',
            param: {
                frequency: 400,
                type: 'bandpass',
                Q: 8,
                gain: 1
            },
            input: {
                name: 'VCO',
                param: {
                    frequency: 'cv',
                    type: 'sawtooth'
                }
            }
        }
    }
};
