"use client"

import { useEffect, useState, useCallback } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { getTests, Test } from "@/api/tests/route"

type RootStackParamList = {
  TestDetail: { testId: number }
}

export default function TestListScreen() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const loadTests = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true)
    try {
      const data = await getTests()
      setTests(data)
      setError(null)
    } catch (err) {
      setError("Erreur lors du chargement des tests")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    loadTests(false)
  }

  useEffect(() => {
    loadTests()
  }, [loadTests])

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadTests()}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({ item }: { item: Test }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("TestDetail", { testId: item.id })}>
      {item.attributes.image?.data && (
        <Image
          source={{
            uri: `http://192.168.100.9:1337${item.attributes.image.data.attributes.url}`,
            headers: {
              Authorization:
                "Bearer 3bf5dd63e926b8274c69d0725cbcb58fff0557c122389deb3b1b05c891c62c9fc18917cfa1b913ea60731cc1687426d8d1b1df629e479c783ade7bdc261e025fb2189a84daf3c0fc38a7acc07aae9c809464955f0a1d68c7fd3d9d17c4855986c632f756cfd3a73c9ac714f84e484db0f547ccdf84613e6bdb9b5d1e36e7b2b9",
            },
          }}
          style={styles.image}
        />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.attributes.title}</Text>
        <Text style={styles.documentId}>ID: {item.attributes.documentId}</Text>
        <Text style={styles.questions}>{item.attributes.questions.length} questions</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={tests}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  documentId: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  questions: {
    fontSize: 14,
    color: "#666",
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#0000ff",
    padding: 12,
    borderRadius: 6,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
})

