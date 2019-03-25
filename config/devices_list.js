var devlist = [
    {
        ID: "lidar001",
        ModelName: "Lidar V 0.0.1",
        Commands: [
            {
                Name: "GetStatus",
                Description: "Retorna o estado do Dispositivo"
            }
        ]
    },
    {
        ID: "esp32001",
        ModelName: "Esp32 V 0.0.1",
        Commands: [
            {
                Name: "#DV01 ST;",
                Description: "Retorna o estado do Dispositivo"
            },
            {
                Name: "#DV01 ST1;",
                Description: "Configura o estado do Dispositivo para 1"
            },
            {
                Name: "#DV01 ST0;",
                Description: "Configura o estado do Dispositivo para 0"
            }
        ]
    }

]

module.exports = devlist;